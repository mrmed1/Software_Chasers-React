import {useQuery} from "react-query";
import React from "react";
import { Pie } from 'react-chartjs-2';
import {Dimmer, Loader} from "semantic-ui-react";
import {Chart, ArcElement, Tooltip, Legend} from 'chart.js'
import {GetStatisticsByCompany, GetStatisticsByCountry, GetStatisticsByTeacher} from "../../Service/StatisticsService";
Chart.register(ArcElement, Tooltip, Legend);

export default function StatisticsPFE() {

    const {data: statisticstacher} = useQuery('statisticsteacher', GetStatisticsByTeacher);
    const {data: statisticscompany} = useQuery('statisticscompany', GetStatisticsByCompany);
    const {data: statisticscountry, isLoading} = useQuery('statisticscountry', GetStatisticsByCountry);

    if (isLoading) {
        return (
            <Dimmer active inverted>
                <Loader size="big">Loading...</Loader>
            </Dimmer>
        );
    }

    const teacherData = statisticstacher?.map((item) => ({
        label: item.teacher,
        value: item.count,
    }));

    const companyData = statisticscompany?.map((item) => ({
        label: item.company,
        value: item.count,
    }));

    const countryData = statisticscountry?.map((item) => ({
        label: item.country,
        value: item.count,
    }));

    const chartOptions = {
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,

            },
            tooltips: {
                callbacks: {
                    label: function(context) {
                        // context is the tooltip context
                        // here, we'll use the label and value of the data point to create the tooltip label
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        return `${label}: ${value}`;
                    }
                }
            }
        },
        maintainAspectRatio: true,
        responsive: true
    };
    const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF8C00', '#DC143C', '#4169E1', '#7CFC00', '#FFD700', '#8B0000', '#FF69B4', '#00FA9A', '#FFA500', '#00CED1', '#800080', '#9400D3', '#6A5ACD', '#DAA520'];



    return (
        <div style={{display: "flex", flexWrap: "wrap",justifyContent:"space-between"}}>
            <div>
                <h3>Teacher Statistics</h3>
                <Pie
                    data={{
                        labels: teacherData?.map((item) => item.label),
                        datasets: [{
                            data: teacherData?.map((item) => item.value),
                            backgroundColor: backgroundColors.slice(0, teacherData?.length),
                        }],
                    }}
                    options={chartOptions}
                />
            </div>
            <div>
                <h3>Company Statistics</h3>
                <Pie
                    data={{
                        labels: companyData?.map((item) => item.label),
                        datasets: [{
                            data: companyData?.map((item) => item.value),
                            backgroundColor: backgroundColors.slice(0, companyData?.length),
                        }],
                    }}
                    options={chartOptions}
                />
            </div>
            <div>
                <h3>Country Statistics</h3>
                <Pie
                    data={{
                        labels: countryData?.map((item) => item.label),
                        datasets: [{
                            data: countryData?.map((item) => item.value),
                            backgroundColor: backgroundColors.slice(0, countryData?.length),
                        }],
                    }}
                    options={chartOptions}
                />
            </div>
        </div>
    );
}
