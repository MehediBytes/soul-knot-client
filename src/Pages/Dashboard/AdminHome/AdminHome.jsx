import { Helmet } from "react-helmet-async";
import UsePayments from "../../../Hooks/UsePayments";
import UseBiodata from "../../../Hooks/UseBiodata";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminHome = () => {

    const [payments, paymentsLoading] = UsePayments();
    const [biodata, loading] = UseBiodata()
    const [dashboardData, setDashboardData] = useState({ totalBiodata: 0, maleBiodata: 0, femaleBiodata: 0, premiumBiodata: 0, totalRevenue: 0, });
    console.log(dashboardData);

    useEffect(() => {
        if (!loading && !paymentsLoading && biodata && payments) {
            const totalBiodata = biodata.length;
            const maleBiodata = biodata.filter(story => story.biodataType === "Male").length;
            const femaleBiodata = biodata.filter(story => story.biodataType === "Female").length;
            const premiumBiodata = biodata.filter(story => story.memberType === "premium").length;
            const totalRevenue = payments.reduce((sum, payment) => sum + payment.paymentAmount, 0);

            setDashboardData({ totalBiodata, maleBiodata, femaleBiodata, premiumBiodata, totalRevenue, });
        }
    }, [biodata, loading, payments, paymentsLoading]);

    if (loading || paymentsLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-pink-500 border-t-transparent"></div>
            </div>
        );
    }

    // Pie chart data
    const pieData = {
        labels: ["Total Biodata", "Male Biodata", "Female Biodata", "Premium Biodata", "Total Revenue"],
        datasets: [
            {
                data: [
                    dashboardData.totalBiodata,
                    dashboardData.maleBiodata,
                    dashboardData.femaleBiodata,
                    dashboardData.premiumBiodata,
                    dashboardData.totalRevenue,
                ],
                backgroundColor: ["#36A2EB", "#FF6384", "#4BC0C0", "#FFCE56", "#9966FF"],
                hoverBackgroundColor: ["#36A2EB", "#FF6384", "#4BC0C0", "#FFCE56", "#9966FF"],
            },
        ],
    };

    return (
        <div className="max-w-7xl mx-auto">
            <Helmet>
                <title>Admin-Dashboard | Soul-Knot</title>
            </Helmet>
            <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="p-4 bg-[#36A2EB] flex justify-center items-center flex-col gap-3 rounded-full">
                    <h4 className="text-2xl text-white font-bold">Total Biodata</h4>
                    <p className="text-3xl font-bold">{dashboardData.totalBiodata}</p>
                </div>
                <div className="p-4 bg-[#FF6384] flex justify-center items-center flex-col gap-3 rounded-full">
                    <h4 className="text-2xl text-white font-bold">Male Biodata</h4>
                    <p className="text-3xl font-bold">{dashboardData.maleBiodata}</p>
                </div>
                <div className="p-4 bg-[#4BC0C0] flex justify-center items-center flex-col gap-3 rounded-full">
                    <h4 className="text-2xl text-white font-bold">Female Biodata</h4>
                    <p className="text-3xl font-bold">{dashboardData.femaleBiodata}</p>
                </div>
                <div className="p-4 bg-[#FFCE56] flex justify-center items-center flex-col gap-3 rounded-full">
                    <h4 className="text-2xl text-white font-bold">Premium Biodata</h4>
                    <p className="text-3xl font-bold">{dashboardData.premiumBiodata}</p>
                </div>
                <div className="p-4 bg-[#9966FF] flex justify-center items-center flex-col gap-3 rounded-full col-span-2">
                    <h4 className="text-2xl text-white font-bold">Total Revenue</h4>
                    <p className="text-3xl font-bold">${dashboardData.totalRevenue.toFixed(2)}</p>
                </div>
            </div>
            <div className="p-4 md:w-2/3 mx-auto">
                <h4 className="text-center mb-5 text-2xl font-bold text-pink-500">Data Breakdown</h4>
                <Pie data={pieData} />
            </div>
        </div>
    );
};

export default AdminHome;