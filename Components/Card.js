import { StyleSheet, Text, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

export default function Card({Heading,Ratio,Status}){
    return (
        <View style={styles.card}>
            <View style={styles.cardHeading}>
                <Text>{Heading}</Text>
            </View>
            <View style={styles.progressBar}>
            <CircularProgress value={Ratio} radius={20} duration={1000} progressValueColor={Ratio>60?'#2ecc71':'#ff0000'} maxValue={100} titleColor={'black'} titleStyle={{fontWeight:'bold'}} inActiveStrokeColor={Ratio>60?'#2ecc71':'#ff0000'} inActiveStrokeOpacity={0.2} activeStrokeColor={Ratio>60?'#2ecc71':'#ff0000'}></CircularProgress>
            </View>
            
            <View style={styles.cardRatio}>
                <Text>{Ratio}</Text>
            </View>
            <View style={styles.stitched}>
                <View style={styles.cardContent}>
                <Text style={styles.content}>{Status}</Text>
                </View>
            </View>
            
        </View>
    )
}

const styles=StyleSheet.create({
    card:{
        borderRadius:8,
        elevation:3,
        backgroundColor:'#fff',
        shadowOffset:{width:1,height:1},
        shadowColor:'#333',
        shadowOpacity:0.3,
        shadowRadius:5,
        marginHorizontal:4,
        marginVertical:6
    },
    cardHeading:{
        marginHorizontal:18,
        marginVertical:20,
        width:200
    },
    cardRatio:{
        opacity:0.4,
        marginLeft:20,
        marginTop:-5
    },
    stitched:{
        padding:25,
        margin:12,
        //backgroundColor:'#fff',
        //color:'#000',
        fontSize:21,
        //fontWeight:'bold',
        //lineHeight:1.3,
        borderRadius:1,
        //fontWeight:'normal',
        //textShadowColor:"#000",
        //shadowColor:'#000',
        //elevation:6,
        //shadowOffset:{width:1,height:1},
        //shadowOpacity:0.5,
        borderStyle:'dashed',
        borderColor:'#808080',
        borderWidth:1
    },
    cardContent:{
    //     color:'#808080',
    //     fontSize:16,
    //     fontFamily:'Inter'
    },
    content:{
        color:'#808080'
    },
    progressBar:{
        position:'absolute',
        top:8,
        right:16
    }
});