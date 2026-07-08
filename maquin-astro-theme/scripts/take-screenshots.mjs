import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

// 定义要测试的页面
const pages = [
  { path: '/', name: 'home', activeNav: 'home' },
  { path: '/about-us/', name: 'about-us', activeNav: 'about' },
  { path: '/blog/', name: 'blog', activeNav: 'pages' },
  { path: '/equipment-detail/', name: 'equipment-detail', activeNav: 'equipment' },
  { path: '/contact-us/', name: 'contact-us', activeNav: 'contact' },
  { path: '/404.html', name: '404', activeNav: 'pages', expectedStatus: 200 },
  { path: '/essential-tips-for-maintaining-heavy-machinery-prolonging-lifespan-and-efficiency-2/', name: 'single-post', activeNav: 'pages' }
];

const targetDir = '/Users/peterpc/Documents/liftpolemachine-web/qa-screenshots';
mkdirSync(targetDir, { recursive: true });

async function run() {
  let browser;
  try {
    browser = await chromium.launch();
  } catch (err) {
    console.log('Unable to launch default chromium, trying system Google Chrome...');
    browser = await chromium.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    });
  }

  const results = [];

  for (const pageConfig of pages) {
    const astroUrl = `http://127.0.0.1:4321${pageConfig.path}`;
    const baselineUrl = `http://127.0.0.1:4173${pageConfig.path}`;

    // 1. 测试 Astro 页面
    const page = await browser.newPage();
    
    // Desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    const astroRes = await page.goto(astroUrl);
    const astroStatus = astroRes.status();
    console.log(`Visited Astro ${astroUrl} -> Status ${astroStatus}`);
    
    // 检查 activeNav class
    const activeClassCorrect = await page.evaluate((nav) => {
      const mapping = {
        home: 'menu-item-112',
        about: 'menu-item-113',
        equipment: 'menu-item-123',
        contact: 'menu-item-116',
        pages: 'menu-item-117'
      };
      const activeId = mapping[nav];
      if (!activeId) return true; // 'none' 不需要 class
      
      const li = document.querySelector(`.elementor-nav-menu li.${activeId}`);
      if (!li) return false;
      const isLiActive = li.classList.contains('current-menu-item');
      const a = li.querySelector('a');
      const isAActive = a ? (a.classList.contains('elementor-item-active') && a.getAttribute('aria-current') === 'page') : false;
      return isLiActive && isAActive;
    }, pageConfig.activeNav);

    console.log(`  ActiveNav [${pageConfig.activeNav}] correct: ${activeClassCorrect}`);

    // Desktop screenshot
    await page.screenshot({ path: join(targetDir, `astro-${pageConfig.name}-desktop.png`), fullPage: true });

    // Mobile view
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(500);
    await page.screenshot({ path: join(targetDir, `astro-${pageConfig.name}-mobile.png`), fullPage: true });

    // Hamburger menu test
    if (pageConfig.name === 'home') {
      const toggle = page.locator('.elementor-menu-toggle');
      if (await toggle.isVisible()) {
        await toggle.click();
        await page.waitForTimeout(500);
        await page.screenshot({ path: join(targetDir, `astro-home-mobile-menu-open.png`) });
        console.log('  Mobile hamburger menu toggled and screenshotted');
      }
    }

    await page.close();

    // 2. 测试 Baseline 页面
    const pageB = await browser.newPage();
    await pageB.setViewportSize({ width: 1280, height: 720 });
    const baseRes = await pageB.goto(baselineUrl);
    const baseStatus = baseRes.status();
    console.log(`Visited Baseline ${baselineUrl} -> Status ${baseStatus}`);
    
    // Desktop screenshot
    await pageB.screenshot({ path: join(targetDir, `baseline-${pageConfig.name}-desktop.png`), fullPage: true });

    // Mobile view
    await pageB.setViewportSize({ width: 390, height: 844 });
    await pageB.waitForTimeout(500);
    await pageB.screenshot({ path: join(targetDir, `baseline-${pageConfig.name}-mobile.png`), fullPage: true });
    await pageB.close();

    results.push({
      name: pageConfig.name,
      path: pageConfig.path,
      astroStatus,
      baseStatus,
      activeNavCorrect: activeClassCorrect
    });
  }

  await browser.close();

  // 写入 JSON 结果
  writeFileSync(
    join('/Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme', 'test-results.json'),
    JSON.stringify(results, null, 2)
  );
  console.log('Tests completed successfully! Results written to test-results.json');
}

run().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
