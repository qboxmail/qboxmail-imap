var LITPLACEHOLDER = String.fromCharCode(0);

var cases = [
  {
    name: "Unquoted bracket value",
    input: "(UID 1 X-MAILBOX INBOX/[AAAAA]/TEST)",
    expected: '(UID 1 X-MAILBOX "INBOX/[AAAAA]/TEST")',
  },
  {
    name: "Already quoted value",
    input: '(UID 1 X-MAILBOX "INBOX/[AAAAA]/TEST")',
    expected: '(UID 1 X-MAILBOX "INBOX/[AAAAA]/TEST")',
  },
  {
    name: "NIL value",
    input: "(UID 1 X-MAILBOX NIL)",
    expected: "(UID 1 X-MAILBOX NIL)",
  },
  {
    name: "Literal placeholder",
    input: "(UID 1 X-MAILBOX " + LITPLACEHOLDER + ")",
    expected: "(UID 1 X-MAILBOX " + LITPLACEHOLDER + ")",
  },
  {
    name: "No brackets",
    input: "(UID 1 X-MAILBOX INBOX/AAAAA/TEST)",
    expected: "(UID 1 X-MAILBOX INBOX/AAAAA/TEST)",
  },
  {
    name: "Closing bracket only",
    input: "(UID 1 X-MAILBOX INBOX/AAAAA]/TEST)",
    expected: '(UID 1 X-MAILBOX "INBOX/AAAAA]/TEST")',
  },
  {
    name: "Quotes and backslash inside value",
    input: '(UID 1 X-MAILBOX INBOX/[A\\B]/"TEST")',
    expected: '(UID 1 X-MAILBOX "INBOX/[A\\\\B]/\\"TEST\\"")',
  },
  {
    name: "List value",
    input: "(UID 1 x-mailbox (INBOX/[AAA]/TEST))",
    expected: "(UID 1 x-mailbox (INBOX/[AAA]/TEST))",
  },
];

function quoteValue(value) {
  return '"' + value.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
}

var mailboxNames = [
  "INBOX/Work/Important",
  "INBOX/Work/💼 Projects",
  "INBOX/Personal/❤️ Family",
  "INBOX/Personal/📸 Photos",
  "Archive/2024/Invoices",
  "Archive/2024/🧾 Receipts",
  "Archive/2023/Old Stuff",
  "Archive/2023/📦 Backup",
  "Sent/Clients/Acme Corp",
  'Sent/Clients/Big "Enterprise"',
  "Sent/Partners/Français SARL",
  "Sent/Partners/Español S.L.",
  "Drafts/Ideas/New Features",
  "Drafts/Ideas/🔥 Urgent",
  "Drafts/Specs/API v2",
  "Drafts/Specs/Breaking Changes",
  "Trash/Auto Deleted/30 Days",
  "Trash/Auto Deleted/⚠️ Large",
  "Trash/Manual/Cleanup",
  "Trash/Manual/Old Mail",
  "INBOX/💼 Work/2026 Roadmap",
  "INBOX/💼 Work/Über Important",
  "INBOX/📂 Projects/Open Source",
  "INBOX/📂 Projects/Private",
  "Finance/Fatture (2024)/Pagate",
  "Finance/Fatture (2024)/Da Pagare",
  "Finance/Receipts [Old]/Scanned",
  "Finance/Receipts [Old]/🧾 Digital",
  "Finance/[Receipts Old]/🧾 Digital",
  "Finance/[ReceiptsOld]/🧾 Digital",
  "Clients/Acme (VIP)/Invoices",
  "Clients/Acme (VIP)/Contracts",
  "Clients/BigCorp {EU}/Signed",
  "Clients/BigCorp {EU}/Pending",
  "Unicode/日本語/テスト",
  "Unicode/日本語/📨 メール",
  "Unicode/[日本語]/📨 メール",
  "Unicode/עברית/בדיקה",
  "Unicode/عربي/رسائل",
  'Special/Quotes "Test"/Level 3',
  "Special/Quotes \"Test\"/'Single'",
  "Special/Backslash \\ Folder/End",
  "Special/Colon:Folder/Semi;Colon",
  "EdgeCases/..Hidden/Folder",
  "EdgeCases/Trailing../Dots",
  "EdgeCases/Zero​Width​Space/Test",
  "EdgeCases/Non-Breaking Space/Here",
  "Visual/Inbox/Іnbox",
  "Visual/Inbox/lnbox",
  "Visual/Inbox/Inbox",
  "Deep/Nesting/LevelOne",
  "Deep/Nesting/LevelTwo",
  "Deep/Nesting/LevelThree",
  "Emoji/🔥 Urgent/Now",
  "Emoji/🔥 Urgent/Later",
  "Emoji/📦 Archive/Old",
  "Emoji/📦 Archive/New",
];

mailboxNames.forEach(function (name) {
  var quoted = quoteValue(name);
  cases.push({
    name: "Mailbox name (quoted): " + name,
    input: "(UID 1 X-MAILBOX " + quoted + ")",
    expected: "(UID 1 X-MAILBOX " + quoted + ")",
  });
});

module.exports = cases;
