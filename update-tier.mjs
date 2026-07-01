import { readFileSync, writeFileSync } from "fs";
import { getLoyaltyTier } from "./src/lib/utils.js";

const filePath = "./src/data/members.json";

const raw = readFileSync(filePath, "utf8");
const members = JSON.parse(raw);

const updatedMembers = members.map((member) => ({
  ...member,
  tier: getLoyaltyTier(member.poin ?? 0),
}));

writeFileSync(filePath, JSON.stringify(updatedMembers, null, 2) + "\n", "utf8");

console.log(`Updated ${updatedMembers.length} members in ${filePath}`);
console.table(updatedMembers.map((member) => ({
  id: member.id,
  nama: member.nama,
  poin: member.poin,
  tier: member.tier,
})));
