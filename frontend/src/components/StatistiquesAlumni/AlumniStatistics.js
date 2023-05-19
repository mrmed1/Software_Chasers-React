import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);


//const datata = { "alumniByCountry": [{ "_id": "Belgium", "count": 5 }, { "_id": "Italy", "count": 6 }, { "_id": "France", "count": 4 }, { "_id": "United States", "count": 2 }, { "_id": "Tunisia", "count": 2 }, { "_id": "Germany", "count": 2 }], "alumniByCompany": [{ "_id": "NeoXam", "count": 5 }, { "_id": "Toshiba", "count": 4 }, { "_id": "Ford", "count": 6 }, { "_id": "NASA", "count": 2 }, { "_id": "Vermeg", "count": 2 }, { "_id": "SopraHR", "count": 2 }], "alumniByGraduationYear": [{ "_id": "2012", "count": 1 }, { "_id": "2020", "count": 3 }, { "_id": "2023", "count": 1 }, { "_id": "2019", "count": 2 }, { "_id": "2018", "count": 14 }] }
const AlumniStatistics = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        console.log("response: test");
        axios
            .get("https://school.eastus.cloudapp.azure.com/api/internship/stat/alumni")
            .then((response) => {
                console.log("response: ", response.data.alumniByCountry);
                setData(response.data);
            })
            .catch((error) => {
                console.error("error: ", error);
            });
    }, []);

    console.log("the data: ", data);

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <div>
            <h1 className="titre" >Alumni Data</h1>
            {data && data.alumniByCountry && data.alumniByCompany && data.alumniByGraduationYear && (
                <div>
                    <h3 style={{ color: "#039BE5", fontSize: "Blod", marginTop: "50px" }}>Alumni by Country</h3>
                    <Bar
                        data={{
                            labels: data.alumniByCountry.map((item) => item._id),
                            datasets: [
                                {
                                    label: 'Count',
                                    data: data.alumniByCountry.map((item) => item.count),
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)',
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        options={options}
                    />
                    <h3 style={{ color: "#039BE5", fontSize: "Blod", marginTop: "50px" }}>Alumni by Company</h3>
                    <Bar
                        data={{
                            labels: data.alumniByCompany.map((item) => item._id),
                            datasets: [
                                {
                                    label: 'Count',
                                    data: data.alumniByCompany.map((item) => item.count),
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)',
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        options={options}
                    />
                    <h3 style={{ color: "#039BE5", fontSize: "Blod", marginTop: "50px" }} >Alumni by Graduation Year</h3>
                    <Bar
                        data={{
                            labels: data.alumniByGraduationYear.map((item) => item._id),
                            datasets: [
                                {
                                    label: 'Count',
                                    data: data.alumniByGraduationYear.map((item) => item.count),
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)',
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        options={options}
                    />
                </div>
            )
            }
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

export default AlumniStatistics;