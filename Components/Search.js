import { Feather } from '@expo/vector-icons'
import React from 'react'
import { View,Text } from 'react-native'

export default function Search() {
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text>This is Search Screen</Text>
        <Feather name="search" size={20} color="#C6C6C6" />
    </View>
  )
}
