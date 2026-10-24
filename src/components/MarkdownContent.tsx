import React from "react";

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  // Parse markdown lines into structured elements
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    // Empty lines
    if (!line.trim()) {
      index++;
      continue;
    }

    // Code blocks / ASCII diagrams
    if (line.trim().startsWith("```")) {
      const codeLines: string[] = [];
      index++;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index++;
      }
      index++; // skip closing ```
      elements.push(
        <div
          key={`code-${index}`}
          style={{
            backgroundColor: "var(--zinc-950)",
            color: "#A7F3D0",
            padding: "20px",
            borderRadius: "14px",
            margin: "28px 0",
            fontFamily: "monospace",
            fontSize: "13px",
            lineHeight: 1.6,
            overflowX: "auto",
            border: "1px solid var(--zinc-800)",
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
          }}
        >
          <pre style={{ margin: 0 }}>{codeLines.join("\n")}</pre>
        </div>
      );
      continue;
    }

    // Markdown Table
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      const tableLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("|") && lines[index].trim().endsWith("|")) {
        tableLines.push(lines[index]);
        index++;
      }

      if (tableLines.length >= 2) {
        const headerCells = tableLines[0]
          .split("|")
          .slice(1, -1)
          .map((c) => c.trim());
        // line 1 is usually separator |:---|:---|
        const rowLines = tableLines.slice(2);

        elements.push(
          <div
            key={`table-${index}`}
            style={{
              margin: "32px 0",
              overflowX: "auto",
              borderRadius: "14px",
              border: "1px solid var(--zinc-200)",
              backgroundColor: "#FFFFFF",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "var(--zinc-50)", borderBottom: "1px solid var(--zinc-200)" }}>
                  {headerCells.map((h, hIdx) => (
                    <th
                      key={hIdx}
                      style={{
                        padding: "14px 18px",
                        fontWeight: 700,
                        color: "var(--zinc-900)",
                        whiteSpace: "nowrap",
                        fontSize: "13px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {renderFormattedText(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rowLines.map((r, rIdx) => {
                  const cells = r
                    .split("|")
                    .slice(1, -1)
                    .map((c) => c.trim());
                  return (
                    <tr
                      key={rIdx}
                      style={{
                        borderBottom: rIdx === rowLines.length - 1 ? "none" : "1px solid var(--zinc-100)",
                        backgroundColor: rIdx % 2 === 1 ? "var(--zinc-50)" : "#FFFFFF",
                      }}
                    >
                      {cells.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          style={{
                            padding: "14px 18px",
                            color: "var(--zinc-700)",
                            lineHeight: 1.5,
                          }}
                        >
                          {renderFormattedText(cell)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // Blockquote / Callout
    if (line.trim().startsWith(">")) {
      const quoteLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index++;
      }
      elements.push(
        <div
          key={`quote-${index}`}
          style={{
            margin: "28px 0",
            padding: "20px 24px",
            backgroundColor: "var(--emerald-50)",
            borderLeft: "4px solid var(--emerald-600)",
            borderRadius: "0 14px 14px 0",
            color: "var(--zinc-800)",
            fontSize: "15px",
            lineHeight: 1.6,
          }}
        >
          {renderFormattedText(quoteLines.join(" "))}
        </div>
      );
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      const text = line.replace("### ", "").trim();
      const id = generateHeadingId(text);
      elements.push(
        <h3
          key={`h3-${index}`}
          id={id}
          style={{
            fontSize: "1.45rem",
            fontWeight: 800,
            color: "var(--zinc-950)",
            letterSpacing: "-0.03em",
            marginTop: "44px",
            marginBottom: "16px",
            scrollMarginTop: "100px",
          }}
        >
          {text}
        </h3>
      );
      index++;
      continue;
    }

    if (line.startsWith("#### ")) {
      const text = line.replace("#### ", "").trim();
      elements.push(
        <h4
          key={`h4-${index}`}
          style={{
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "var(--zinc-900)",
            marginTop: "30px",
            marginBottom: "12px",
          }}
        >
          {text}
        </h4>
      );
      index++;
      continue;
    }

    // Horizontal Rule
    if (line.trim() === "---") {
      elements.push(
        <hr
          key={`hr-${index}`}
          style={{
            border: "none",
            borderTop: "1px solid var(--zinc-200)",
            margin: "40px 0",
          }}
        />
      );
      index++;
      continue;
    }

    // Unordered list items
    if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
      const listItems: string[] = [];
      while (
        index < lines.length &&
        (lines[index].trim().startsWith("* ") || lines[index].trim().startsWith("- "))
      ) {
        listItems.push(lines[index].trim().replace(/^[\*\-]\s+/, ""));
        index++;
      }
      elements.push(
        <ul
          key={`ul-${index}`}
          style={{
            margin: "20px 0",
            paddingLeft: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            color: "var(--zinc-700)",
            fontSize: "15px",
            lineHeight: 1.65,
          }}
        >
          {listItems.map((item, iIdx) => (
            <li key={iIdx}>{renderFormattedText(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list items
    if (/^\d+\.\s/.test(line.trim())) {
      const listItems: string[] = [];
      while (index < lines.length && /^\d+\.\s/.test(lines[index].trim())) {
        listItems.push(lines[index].trim().replace(/^\d+\.\s+/, ""));
        index++;
      }
      elements.push(
        <ol
          key={`ol-${index}`}
          style={{
            margin: "20px 0",
            paddingLeft: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            color: "var(--zinc-700)",
            fontSize: "15px",
            lineHeight: 1.65,
          }}
        >
          {listItems.map((item, iIdx) => (
            <li key={iIdx}>{renderFormattedText(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Regular Paragraph
    elements.push(
      <p
        key={`p-${index}`}
        style={{
          fontSize: "16px",
          lineHeight: 1.75,
          color: "var(--zinc-700)",
          marginBottom: "20px",
        }}
      >
        {renderFormattedText(line)}
      </p>
    );
    index++;
  }

  return <div className="article-body-content">{elements}</div>;
}

function generateHeadingId(text: string): string {
  // Extract custom id if it matches numbered sections e.g. "1. Why Restaurant..."
  const clean = text
    .toLowerCase()
    .replace(/^\d+\.\s*/, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  
  if (text.includes("Why Restaurant Tech")) return "why-kashmir-is-different";
  if (text.includes("Non-Negotiable Features")) return "must-have-features";
  if (text.includes("Top 5 POS Systems")) return "comparison-top-systems";
  if (text.includes("True 3-Year Cost")) return "cost-breakdown";
  if (text.includes("Wazwan")) return "wazwan-cafe-workflows";
  if (text.includes("Which System Is Right")) return "how-to-choose";

  if (text.includes("Rising Cost")) return "saas-trap";
  if (text.includes("Deep Feature Breakdown")) return "feature-breakdown";
  if (text.includes("Hidden Costs")) return "hidden-costs";
  if (text.includes("Head-to-Head")) return "head-to-head";
  if (text.includes("3-Year Total Cost")) return "tco-3years";
  if (text.includes("Final Verdict")) return "verdict";

  if (text.includes("Anatomy of a Peak Rush")) return "rush-hour-problem";
  if (text.includes("4-Step Paperless KOT")) return "digital-kot-workflow";
  if (text.includes("Surviving Internet Drops")) return "handling-offline-drops";
  if (text.includes("Eliminating Order Theft")) return "eliminating-order-theft";
  if (text.includes("Faster Billing Increases")) return "faster-table-turnover";
  if (text.includes("Implementation Checklist")) return "practical-checklist";

  if (text.includes("Current Restaurant GST Rates")) return "gst-rates-overview";
  if (text.includes("Regular Scheme (5%) vs Composition")) return "regular-vs-composition";
  if (text.includes("Mandatory Elements")) return "invoice-requirements";
  if (text.includes("Input Tax Credit")) return "itc-misconceptions";
  if (text.includes("Transitioning from Thermal")) return "paper-vs-digital-bills";
  if (text.includes("Automating GST")) return "pos-tax-automation";

  return clean || "heading";
}

function renderFormattedText(text: string): React.ReactNode {
  // Simple parser for **bold**, *italic*, and `code`
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(
        <strong key={match.index} style={{ fontWeight: 700, color: "var(--zinc-950)" }}>
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("*") && token.endsWith("*")) {
      parts.push(
        <em key={match.index} style={{ fontStyle: "italic", color: "var(--zinc-800)" }}>
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(
        <code
          key={match.index}
          style={{
            backgroundColor: "var(--zinc-100)",
            color: "var(--zinc-900)",
            padding: "2px 6px",
            borderRadius: "5px",
            fontSize: "0.88em",
            fontFamily: "monospace",
          }}
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
