import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { ScrollView } from "react-native";
import { AppContext } from "../AppContext";
import DropdownComponent from "./Dropdown";

const fetchSemesterGradeDetails = async (gradeDetailRequest, bearerToken) => {
  const response = await fetch(
    "https://webportal.jiit.ac.in:6011/StudentPortalAPI/studentgradecard/showstudentgradecard",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(gradeDetailRequest),
    }
  );
  return response.json();
};


const GradeDropdown = ({ setRegistrationId }) => {
  const { studentDetail } = React.useContext(AppContext);
  const queryClient = useQueryClient();

  const studentRegistrationInfoForGradeRequest = {
    "clientid": "JAYPEE",
    "instituteid": studentDetail?.response?.regdata?.institutelist[0].value,
    "studentid": studentDetail?.response?.regdata.memberid,
    "membertype": "S"
  };
  const bearerToken = studentDetail.response.regdata.token;
  const fetchStudentRegistrationInfoForGrade = async (studentRegistrationInfoForGradeRequest, bearerToken) => {
    const response = await fetch('https://webportal.jiit.ac.in:6011/StudentPortalAPI/studentgradecard/getregistrationList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(studentRegistrationInfoForGradeRequest)
    });
    return response.json();
  };
  const { data } = useQuery(['studentRegistrationInfoForGradeKey'], () => fetchStudentRegistrationInfoForGrade(studentRegistrationInfoForGradeRequest, bearerToken), {
    suspense: true,
    onSuccess: (data) => console.log(data),
  });

  // console.log(data);

  const semList = data?.response?.registrations;
  // console.log(semList);
  const listData = semList.map(registration => ({ label: registration.registrationcode, value: registration.registrationid }))
  return (
    <DropdownComponent listData={listData} onSelect={
      (newRegistrationId) => {
        console.log("registration id line 47", newRegistrationId);
        setRegistrationId(newRegistrationId);
        queryClient.invalidateQueries(['gradeDetail', newRegistrationId]);
      }
    } />
  )
};

export default function Grades() {
  const { studentDetail } = React.useContext(AppContext);
  const [registrationId, setRegistrationId] = useState("NDRUM22050000001");

  const bearerToken = studentDetail.response.regdata.token;
  const gradeDetailQueryKey = ['gradeDetail', registrationId];

  const gradeDetailRequest = {
    instituteid: studentDetail?.response?.regdata?.institutelist[0].value,
    studentid: studentDetail?.response?.regdata.memberid,
    registrationid: registrationId,
    branchid: "NDBRN19040000001",
    programid: "NDPRO19040000021",
  };
  const { data } = useQuery(gradeDetailQueryKey, () => fetchSemesterGradeDetails(gradeDetailRequest, bearerToken), {
    suspense: true,
  });
  const [tableHead, setTableHead] = useState([
    "S. No.",
    "Subject Code",
    "Subject Description",
    "Grade Awarded",
    "Course Credit",
    "Grade Points",
  ]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const tData = data?.response?.gradecard.map((grade, index) => [
      `${index + 1}`,
      grade.subjectcode,
      grade.subjectdesc,
      grade.grade,
      grade.earnedcredit,
      grade.gradepoint,
    ]);
    setTableData(tData);
  }, [data]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <GradeDropdown setRegistrationId={setRegistrationId} />
        <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={tableData} textStyle={styles.text} />
        </Table>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 100, backgroundColor: "#f1f8ff" },
  text: { margin: 6, fontSize:14, fontWeight:"bold" },
});
