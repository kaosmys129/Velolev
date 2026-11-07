# WordPress retirement recovery

The two local `.tar.gz` bundles preserve the pre-change legacy assets, mirrors and source/tool files. They are outside all public and build directories and are ignored by Git. The JSON manifests are the reviewable record; they include original paths, byte counts and SHA-256 hashes. `wordpress-removed-files.json` identifies the retired files specifically; other source files in the main bundle are before-change snapshots.

Main bundle: `wordpress-before-retirement-2026-10-29.tar.gz` (1,870 verified files).
Supplemental tools: `wordpress-retired-tools.tar.gz` (4 verified files).

To inspect or recover, extract into a separate directory first:

```sh
mkdir -p /tmp/volvet-wordpress-recovery
# Run from project root; choose a different empty destination if this already exists.
tar -xzf archives/wordpress-before-retirement-2026-10-29.tar.gz -C /tmp/volvet-wordpress-recovery
tar -xzf archives/wordpress-retired-tools.tar.gz -C /tmp/volvet-wordpress-recovery
```

Compare files and copy back only the required paths. Do not extract the main bundle over the active project: it contains old copies of current source files and package manifests as well as removed files. Restoring the entire former site requires the corresponding old layout, configuration and asset tree together. The active deployment never serves this directory.

The unused former favicon is preserved separately as `wordpress-retired-favicon.ico`; its original path and hash are recorded in `wordpress-removed-files.json`.
