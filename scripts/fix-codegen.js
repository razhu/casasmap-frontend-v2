const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../src/lib/graphql/generated.ts");
let content = fs.readFileSync(filePath, "utf8");

// Remove all references to skipToken and SkipToken
content = content.replace(/Apollo\.SkipToken \| /g, "");
content = content.replace(/Apollo\.skipToken/g, "{}");
content = content.replace(
  /baseOptions === Apollo\.skipToken \? baseOptions : /g,
  ""
);

// Remove all Suspense query hook functions (they use useSuspenseQuery which doesn't exist)
// Match function declarations like: export function useSomethingSuspenseQuery...
content = content.replace(
  /\/\/ @ts-ignore\nexport function \w+SuspenseQuery[^}]+}\s+}/g,
  ""
);

// Remove Suspense query hook result types
content = content.replace(
  /export type \w+SuspenseQueryHookResult[^\n]+\n/g,
  ""
);

fs.writeFileSync(filePath, content, "utf8");
console.log(
  "✅ Fixed skipToken and useSuspenseQuery references in generated.ts"
);
