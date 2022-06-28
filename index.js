#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const package = require("./package.json");
const checker = require("license-checker-rseidelsohn");

const outputFile = path.resolve(".", "dependencies.csv");

async function getDependencies(options = {}) {
  return await new Promise((resolve, reject) => {
    checker.init(
      {
        start: "./",
        ...options,
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
}

async function run() {
  const direct = await getDependencies({
    direct: 0, // weird that it's 0: https://github.com/RSeidelsohn/license-checker-rseidelsohn/issues/35
  });
  const all = await getDependencies();

  const output = [
    ...Object.keys(direct)
      .filter((k) => k !== package.name + "@" + package.version)
      .map((k) => ({
        direct: true,
        package: k,
        license: direct[k].licenses,
        repository: direct[k].repository,
      })),
    ...Object.keys(all)
      .filter((k) => !direct[k])
      .map((k) => ({
        direct: false,
        package: k,
        license: all[k].licenses,
        repository: all[k].repository,
      })),
  ];

  const csv = [
    Object.keys(output[0]).join(","),
    ...output.map((o) => {
      return [
        o.direct ? "direct" : "recursive",
        o.package,
        o.license,
        o.repository,
      ].join(",");
    }),
  ].join("\n");

  fs.writeFileSync(outputFile, csv, "utf8");
}

run()
  .then(() => console.log(`Done. Licenses written to ${outputFile}`))
  .catch((e) => console.error(e));
