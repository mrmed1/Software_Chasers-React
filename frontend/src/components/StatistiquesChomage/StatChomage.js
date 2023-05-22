import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);

function StatChomage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("https://school.eastus.cloudapp.azure.com/api/student/statistics")
                .then((response) => {
                    console.log(response);
                    setData(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
    }, []);

    const chartData = {
        labels: data.map((item) => item._id),
        datasets: [
            {
                label: "Diff",
                data: data.map((item) => item.diff),
                fill: false,
                borderColor: "rgba(75, 192, 192, 1)",
            },
        ],
    };

    return (
        <div>
        <h1 className="titre" >Stat Chomage</h1>
          <div>
            <Line data={chartData} />
          </div>

            <style jsx>{`
                          .titre{
                            text-align: center;
                            color: #1e88e5;
                            margin-bottom: 10px;
                          }`
            } </style>
        </div>
    );
}

export default StatChomage;