"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface DayData {
  date: string;
  letters: number;
  signups: number;
}

export default function TimelineChart({ data }: { data: DayData[] }) {
  return (
    <div style={{ width: "100%", height: 220 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d8" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fontFamily: "var(--font-dm-mono)", fill: "#888" }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 10, fontFamily: "var(--font-dm-mono)", fill: "#888" }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: 11,
              border: "2px solid #e5e0d8",
              borderRadius: 0,
              background: "#faf8f5",
            }}
            labelStyle={{ fontWeight: 700, fontFamily: "var(--font-syne)" }}
          />
          <Line
            type="monotone"
            dataKey="letters"
            name="Courriers"
            stroke="#c0392b"
            strokeWidth={2}
            dot={{ r: 3, fill: "#c0392b" }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="signups"
            name="Inscriptions"
            stroke="#c8a84e"
            strokeWidth={2}
            dot={{ r: 3, fill: "#c8a84e" }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
