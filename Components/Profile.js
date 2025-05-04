import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useQuery } from '@tanstack/react-query';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

const fetchStudentExamDetails = async (examDetailRequest) => {
  const response = await fetch('https://webportal.jiit.ac.in:6011/StudentPortalAPI/studentcommonsontroller/getstudentexamevents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwRUV3VnBmdndEeTlCaVFxTkx4b3RnPT0iLCJzY29wZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfU1RVREVOVCJ9XSwiaXNzIjoiaHR0cDovL2NhbXB1c2x5bnguY29tIiwiaWF0IjoxNjc4NzA2NTY2LCJleHAiOjE2Nzg3OTY1NjZ9.WatoroJeOUKB7w5X5rmmpZsEV9lC1p0Tb5d1fnX1Lcc',
    },
    body: JSON.stringify(examDetailRequest)
  });
  return response.json();
};

export default function Profile() {
  const [tableHead, setTableHead] = useState(['', 'Head1', 'Head2', 'Head3']);
  const [tableTitle, setTableTitle] = useState(['Title', 'Title2', 'Title3', 'Title4']);
  const [tableData, setTableData] = useState([
    ['1', '2', '3'],
    ['a', 'b', 'c'],
    ['1', '2', '3'],
    ['a', 'b', 'c']
  ]);

  return (
    <View style={styles.container}>
      <Table borderStyle={{borderWidth: 1}}>
        <Row data={tableHead} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text}/>
        <TableWrapper style={styles.wrapper}>
          <Col data={tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
          <Rows data={tableData} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
        </TableWrapper>
      </Table>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  text: { textAlign: 'center' }
});
