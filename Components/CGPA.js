import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { ScrollView } from "react-native";
import { AppContext } from "../AppContext";
import { Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

const fetchCGPADetails = async (cgpaDetailRequest, bearerToken) => {
  const response = await fetch(
    "https://webportal.jiit.ac.in:6011/StudentPortalAPI/studentsgpacgpa/getallsemesterdata",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(cgpaDetailRequest),
    }
  );
  return response.json();
};

export default function CGPA() {
  const { studentDetail } = React.useContext(AppContext);
  const [cgpaData, setCGPAData] = useState([]);

  const bearerToken = studentDetail.response.regdata.token;

  const cgpaDetailRequest = {
    instituteid: studentDetail?.response?.regdata?.institutelist[0].value,
    studentid: studentDetail?.response?.regdata.memberid,
    stynumber: "8",
  };

  const { data } = useQuery(
    ["cgpaDetailKey"],
    () => fetchCGPADetails(cgpaDetailRequest, bearerToken),
    {
      suspense: true,
    }
  );
  console.log(data);

  useEffect(() => {
    // Here, you can fetch the CGPA data from the API response and set the state
    // For example, assuming the API response is stored in a variable called "response"
    const cData = data.response.semesterList;
    const labels = cData.map((semester) => semester.stynumber);

    const cgpaList = cData.map((semester) => semester.cgpa);
    setCGPAData(cgpaList);
  }, []);
  console.log(cgpaData);

  return (
    <View>
         <Text style={{ alignSelf: 'center', fontSize: 20, paddingTop:30 }}>CGPA Chart</Text>
      <LineChart
        data={{
          labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7"],
          datasets: [
            {
              data: cgpaData,
            },
          ],
        }}
        width={650}
        height={550}
        yAxisSuffix=""
        yLabelsOffset={1}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#8E44AD",
          backgroundGradientTo: "#9B59B6",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#fff",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          alignItems: "center",
          marginTop: 50,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 100, backgroundColor: "#f1f8ff" },
  text: { margin: 6, fontSize: 14, fontWeight: "bold" },
});
