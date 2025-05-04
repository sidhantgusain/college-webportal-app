import React, { useState } from 'react'
import Card from './Card'
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { FlatList } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AppContext } from '../AppContext';
import DropdownComponent from './Dropdown';

const fetchAttendanceDetail = async (attendanceDetailRequest, bearerToken) => {
  const response = await fetch('https://webportal.jiit.ac.in:6011/StudentPortalAPI/StudentClassAttendance/getstudentattendancedetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`,
    },
    body: JSON.stringify(attendanceDetailRequest)
  });
  return response.json();
};

const AttendanceDropdown = ({ setRegistrationId }) => {
  const { studentDetail } = React.useContext(AppContext);
  const queryClient = useQueryClient();

  console.log('log in dropdown line 36', studentDetail);

  const studentRegistrationInfoForAttendanceRequest = {
    "clientid": "JAYPEE",
    "instituteid": studentDetail?.response?.regdata?.institutelist[0].value,
    "studentid": studentDetail?.response?.regdata.memberid,
    "membertype": "S"
  };
  const bearerToken = studentDetail.response.regdata.token;
  const { data } = useQuery(['studentRegistrationInfoForAttendanceKey'], () => fetchStudentRegistrationInfoForAttendance(studentRegistrationInfoForAttendanceRequest, bearerToken), {
    suspense: true,
    onSuccess: (data) => console.log(data),
  });

  console.log(data);

  const semList = data?.response?.semlist;
  console.log(semList);
  const listData = semList.map(registration => ({ label: registration.registrationcode, value: registration.registrationid }))

  return (
    <DropdownComponent listData={listData} onSelect={
      (newRegistrationId) => {
        console.log("registration id line 47", newRegistrationId);
        setRegistrationId(newRegistrationId);
        queryClient.invalidateQueries(['attendanceDetail', newRegistrationId]);
      }
    } />
  )
};

const fetchStudentRegistrationInfoForAttendance = async (studentRegistrationInfoForAttendanceRequest, bearerToken) => {
  const response = await fetch('https://webportal.jiit.ac.in:6011/StudentPortalAPI/StudentClassAttendance/getstudentInforegistrationforattendence', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`,
    },
    body: JSON.stringify(studentRegistrationInfoForAttendanceRequest)
  });
  return response.json();
};

const renderItem = ({ item }) => (
  <Card Heading={item.heading} Ratio={item.percentage} Status={item.status} />
);

function classesNeededOrCanSkip(classesAttended, totalClasses, minAttendance) {
  const attendancePercentage = (classesAttended / totalClasses) * 100;
  if (attendancePercentage <= minAttendance) {
    const classesNeeded = Math.ceil(((minAttendance * totalClasses / 100) - classesAttended) / (1 - (minAttendance / 100)));
    return (classesNeeded)
  } else {
    const classesCanSkip = Math.floor((100 * classesAttended) / minAttendance - totalClasses);
    return (-classesCanSkip)
  }
}

const AttendanceListComponent = () => {
  const { studentDetail } = React.useContext(AppContext);
  const [registrationId, setRegistrationId] = useState("NDRUM22110000001");
  console.log(studentDetail);

  const attendanceDetailRequest = {
    "clientid": "JAYPEE",
    "instituteid": studentDetail?.response?.regdata?.institutelist[0].value,
    "studentid": studentDetail?.response?.regdata.memberid,
    "stynumber": "8",
    "registrationid": registrationId
  };

  const bearerToken = studentDetail.response.regdata.token;
  const attendanceDetailQueryKey = ['attendanceDetail', registrationId]

  const { data } = useQuery(attendanceDetailQueryKey, () => fetchAttendanceDetail(attendanceDetailRequest, bearerToken), {
    enabled: !!registrationId, // Enable the query only when a registration ID is selected
  });
  const cardsData = data?.response?.studentattendancelist?.map((item, index) => {
    const classesAttended = parseInt(item.Ltotalpres);
    const totalClasses = parseInt(item.Ltotalclass);
    const minAttendance = 60;
    const classesDiff = classesNeededOrCanSkip(classesAttended, totalClasses, minAttendance);

    return {
      id: `${index + 1}`,
      heading: item.subjectcode,
      percentage: item.Lpercentage,
      ratio: `${item.Ltotalpres}/${item.Ltotalclass}`,
      status: classesDiff >= 0 ? `Attend next ${classesDiff} classes to get back on track` : `On track, you can skip next ${-classesDiff} classes`,
    };
  }) ?? [];
  console.log(cardsData);

  return (
    <View>
      <AttendanceDropdown setRegistrationId={setRegistrationId} />
      <FlatList
        data={cardsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}


export default function Attendance({ navigation }) {
  return (
    <View style={styles.container}>
      {/* <Button title="Visit Again" onPress={()=>navigation.navigate('Attendance')}>
      </Button> */}
      <AttendanceListComponent />
      {/* <Login /> */}
      {/* <DropDown /> */}
      <StatusBar style="auto" />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40
  },
})