import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography } from "@material-tailwind/react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4ADE80", "#60A5FA"];

const AdminBalance = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/admin/balance`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  const { totalBalance, recentTransactions, chartData } = data;

  const pieData = [
    { name: "Newsletter Subscribers", value: chartData.newsletterSubscribers },
    { name: "Paid Members", value: chartData.paidMembers },
  ];

  return (
    <div className="p-6 space-y-8">
      <Typography variant="h4" className="text-center">
        Admin Balance Overview
      </Typography>

      {/* Total Balance */}
      <Card className="p-6 shadow-md">
        <Typography variant="h5">💰 Total Balance:</Typography>
        <Typography variant="h3" color="green">
          ${(totalBalance / 100).toFixed(2)}
        </Typography>
      </Card>

      {/* Chart */}
      <Card className="p-6 shadow-md">
        <Typography variant="h5" className="mb-4">
          📊 Subscribers vs Paid Members
        </Typography>
        <div className="flex flex-wrap gap-8 justify-center">
          <ResponsiveContainer width={400} height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                label
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Last 6 Transactions */}
      <Card className="p-6 shadow-md">
        <Typography variant="h5" className="mb-4">
          🧾 Recent Transactions
        </Typography>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border">
            <thead className="bg-blue-gray-100 text-left">
              <tr>
                <th className="p-2">Member Email</th>
                <th className="p-2">Package</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr key={tx._id} className="border-t">
                  <td className="p-2">{tx.userEmail}</td>
                  <td className="p-2">{tx.package}</td>
                  <td className="p-2">
                    ${(tx.paymentDetails?.amount / 100).toFixed(2)}
                  </td>
                  <td className="p-2">
                    {new Date(
                      tx.paymentDetails?.created * 1000
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminBalance;
