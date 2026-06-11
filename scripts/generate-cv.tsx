/**
 * Generates public/cv.pdf from the same data that powers the site.
 * Run: npm run generate:cv (also runs on prebuild).
 * ATS-friendly: single column, standard fonts, real text.
 */
import path from "node:path";
import { Document, Page, Text, View, StyleSheet, renderToFile } from "@react-pdf/renderer";
import { SITE } from "../lib/site";
import { experience, skills } from "../content/experience";

/** standard PDF fonts lack arrows/triangles — swap for ASCII */
function ascii(text: string): string {
  return text.replace(/→/g, "->").replace(/↔/g, "<->").replace(/▸/g, ">");
}

const ink = "#11150f";
const dim = "#4a4f48";
const line = "#c9cec6";
const green = "#1d7a3a";

const s = StyleSheet.create({
  page: {
    paddingTop: 42,
    paddingBottom: 42,
    paddingHorizontal: 48,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: ink,
    lineHeight: 1.45,
  },
  name: { fontSize: 22, fontFamily: "Helvetica-Bold", letterSpacing: 0.5, lineHeight: 1 },
  role: { fontSize: 11, color: green, fontFamily: "Courier-Bold", marginTop: 8 },
  contact: { fontSize: 8.5, color: dim, marginTop: 6, fontFamily: "Courier" },
  section: { marginTop: 16 },
  sectionTitle: {
    fontSize: 9,
    fontFamily: "Courier-Bold",
    color: green,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    borderBottomWidth: 0.75,
    borderBottomColor: line,
    paddingBottom: 3,
    marginBottom: 8,
  },
  jobHeader: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  jobRole: { fontFamily: "Helvetica-Bold", fontSize: 10.5 },
  jobPeriod: { fontFamily: "Courier", fontSize: 8.5, color: dim },
  jobSummary: { color: dim, marginTop: 1.5, fontSize: 9 },
  bullet: { flexDirection: "row", marginTop: 2.5, paddingRight: 8 },
  bulletMark: { width: 12, color: green, fontFamily: "Courier" },
  bulletText: { flex: 1 },
  skillRow: { flexDirection: "row", marginTop: 3 },
  skillLabel: { width: 86, fontFamily: "Courier-Bold", fontSize: 8.5, color: dim },
  skillList: { flex: 1, fontSize: 9 },
});

function CV() {
  return (
    <Document
      title={`${SITE.name} — Senior Software Engineer`}
      author={SITE.name}
      subject="Curriculum Vitae"
      keywords={SITE.keywords.join(", ")}
    >
      <Page size="LETTER" style={s.page}>
        {/* header */}
        <Text style={s.name}>{SITE.name}</Text>
        <Text style={s.role}>Senior Software Engineer · legacy modernization + AI tooling</Text>
        <Text style={s.contact}>
          {SITE.email}  ·  {SITE.url.replace("https://", "")}  ·  {SITE.linkedin.replace("https://www.", "")}  ·  {SITE.location}
        </Text>

        {/* profile */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Profile</Text>
          <Text>
            Full-stack software engineer with 8+ years delivering enterprise web applications
            across frontend, backend and data layers. Recent focus: legacy modernization
            (WinForms + stored procedures to .NET Web APIs + React) for a US logistics client,
            combined with production AI tooling — custom MCP servers, agent integrations and a
            forensic incident-investigation methodology. Known for reverse-engineering
            undocumented legacy behavior and shipping modern replacements without regressions.
          </Text>
        </View>

        {/* experience */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Experience</Text>
          {experience.map((job) => (
            <View key={`${job.company}-${job.period}`} wrap={false}>
              <View style={s.jobHeader}>
                <Text style={s.jobRole}>
                  {job.role} · {job.company}
                </Text>
                <Text style={s.jobPeriod}>{job.period}</Text>
              </View>
              <Text style={s.jobSummary}>{ascii(job.summary)}</Text>
              {job.bullets.map((b, i) => (
                <View key={i} style={s.bullet}>
                  <Text style={s.bulletMark}>{">"}</Text>
                  <Text style={s.bulletText}>{ascii(b)}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* skills */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Skills</Text>
          {(
            [
              ["backend", skills.backend],
              ["frontend", skills.frontend],
              ["ai/agents", skills.ai],
              ["practices", skills.practices],
            ] as const
          ).map(([label, items]) => (
            <View key={label} style={s.skillRow}>
              <Text style={s.skillLabel}>{label}</Text>
              <Text style={s.skillList}>{items.join(" · ")}</Text>
            </View>
          ))}
        </View>

        {/* education + languages */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Education & Languages</Text>
          <Text>
            Computer Systems Engineering — Instituto Tecnológico Superior de Chapala, México
          </Text>
          <Text style={{ marginTop: 2 }}>English: fluent · Spanish: native</Text>
        </View>

        {/* footer note */}
        <Text style={{ marginTop: 18, fontSize: 7.5, color: dim, fontFamily: "Courier" }}>
          Generated from the same dataset that powers {SITE.url.replace("https://", "")} — machine-readable version at {SITE.url.replace("https://", "")}/api/cv
        </Text>
      </Page>
    </Document>
  );
}

async function main() {
  const out = path.join(process.cwd(), "public", "cv.pdf");
  await renderToFile(<CV />, out);
  console.log(`cv.pdf written to ${out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
