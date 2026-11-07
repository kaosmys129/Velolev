import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "../node_modules/sharp/lib/index.js";

const root = new URL("../", import.meta.url).pathname;

const items = [
  // Group 1: 生产制造设备 (Factory / Manufacturing)
  {
    category: "factory",
    filename: "cnc-machining-center.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/6/67/DeckelMaho-DMU50e-MachiningCenter.jpg"
  },
  {
    category: "factory",
    filename: "hydraulic-cylinder-assembly.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/99/Double_acting_cylinder%2Chydraulic_cylinders.JPG"
  },
  {
    category: "factory",
    filename: "welding-robot-rig.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Welding_Robot_Facility.jpg"
  },
  {
    category: "factory",
    filename: "flange-base-machining.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Turning_%28machining_process%29-Qom_City_2007-Iran_03.jpg"
  },
  {
    category: "factory",
    filename: "electrical-cabinet-assembly.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/6/6c/M1M3_Electrical_Cabinet_Assembly_%28rubin-dsc-0293%29.jpg"
  },

  // Group 2: 检测设备 (Inspection)
  {
    category: "quality",
    filename: "ultrasonic-flaw-detector.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Ultrasonic_pipeline_test.jpg"
  },
  {
    category: "quality",
    filename: "metal-hardness-tester.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Rockwell_hardness_tester_001.jpg"
  },
  {
    category: "quality",
    filename: "digital-calipers-alignment.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Digital_display_shows_measurement_tools_in_a_workshop_setting.jpg"
  },
  {
    category: "quality",
    filename: "coating-thickness-gauge.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/7c/PhotothermalCoatingThicknessGauges.jpg"
  },

  // Group 3: 测试设备 (Testing)
  {
    category: "quality",
    filename: "vertical-proof-load-test-rig.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/43/Modern_universal_testing_machine.jpg"
  },
  {
    category: "quality",
    filename: "hydraulic-pressure-test-bench.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/70/Hydraulic_control_pad_with_valves.jpg"
  },
  {
    category: "quality",
    filename: "battery-charge-discharge-tester.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/3/3d/INL_battery_testing_lab_%289192409117%29.jpg"
  },
  {
    category: "quality",
    filename: "electrical-safety-test-station.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/1/13/Hipot_tester_in_action.jpg"
  },

  // Group 4: 包装设备 (Packaging)
  {
    category: "packaging",
    filename: "export-wooden-crating-rig.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/55/Standard-plywood-shipping-crate-vol-case.jpg"
  },
  {
    category: "packaging",
    filename: "industrial-vacuum-sealer.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/c/cc/XtraVac_Double_Chamber_Vacuum_Packaging_Machine.png"
  },
  {
    category: "packaging",
    filename: "eva-foam-cnc-router.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/8/8c/DMS_CNC_router_at_SITU_Fabrication_%2812480%29.jpg"
  },
  {
    category: "packaging",
    filename: "strapping-tensioner-rig.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/49/Strapping_Saturn_2500.jpg"
  }
];

async function main() {
  const tmpDir = "/tmp/volvet-equipment-raw";
  mkdirSync(tmpDir, { recursive: true });

  for (const item of items) {
    const rawPath = join(tmpDir, item.filename);
    const destDir = join(root, "public/images", item.category);
    mkdirSync(destDir, { recursive: true });
    const destPath = join(destDir, item.filename);

    console.log(`Downloading [${item.category}] ${item.filename}...`);
    const curlCmd = `curl -s -L -x socks5://127.0.0.1:7897 --retry 3 --retry-delay 2 "${item.url}" -o "${rawPath}"`;
    try {
      execSync(curlCmd, { stdio: "inherit" });
    } catch (err) {
      console.error(`Failed downloading ${item.filename}:`, err.message);
      continue;
    }

    try {
      console.log(`Processing with sharp: ${item.filename}...`);
      await sharp(rawPath)
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality: 85, progressive: true })
        .toFile(destPath);
      console.log(`✓ Saved ${destPath}`);
    } catch (err) {
      console.error(`Failed sharp processing ${item.filename}:`, err.message);
    }
  }

  console.log("\nAll equipment images downloaded and processed successfully!");
}

main();
