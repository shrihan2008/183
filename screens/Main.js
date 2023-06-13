import React, { Component } from "react"
import {Text,StyleSheet,Image,View,TouchableOpacity,SafeAreaView,StatusBar,Platform,ScrollView} from 'react-native'
import {Camera} from 'expo-camera'
import * as Permissions from 'expo-permissions'
import * as FaceDetector from "expo-face-detector"
import Filter1 from '../screens/Filter1'
import Filter2 from '../screens/Filter2'
import Filter3 from '../screens/Filter3'
import Filter4 from '../screens/Filter4'
import Filter5 from '../screens/Filter5'

import {RFValue,RFPercentage} from 'react-native-responsive-fontsize'

let data=[

    {
        "id":"1",
        "image":require("../assets/spectacle.png")
    },
    {
        "id":"2",
        "image":require("../assets/pl.png")
    },
    {
        "id":"3",
        "image":require("../assets/crown-pic1.png")
    },
    {
        "id":"4",
        "image":require("../assets/hair-pic1.png")
    },
    {
        "id":"5",
        "image":require("../assets/other-pic1.png")
    }
]
export default class Main extends React.Component{
    constructor(props){
    super(props)
    this.state={
        hasCameraPermission:null,
        faces:[],
        current_filter:"Filter_1",

    }
    }
    componentDidMount(){
        Permissions
           .askAsync(Permissions.CAMERA)
           .then(this.onCameraPermission)
    }

    onCameraPermission = (status) => {
        this.setState({
            hasCameraPermission:status.status==='granted'
        })
    }


    onFacesDetected=(faces)=>{

        this.setState({
            faces:faces
        })
    }

    onFacesDetectionError=(error)=>{
console.log(error)

    }
    render(){
       const{hasCameraPermission}=this.state
       if(hasCameraPermission===null){
        return <View/>
       }

       if(hasCameraPermission===false){
        return (
            <View style={styles.container}><Text>Please give access to camera</Text></View>
        )
       }
       console.log(this.state.faces)

       return(
        <View style={styles.container}>
            <SafeAreaView style={styles.safearea}/>
            <View style={styles.headingContainer}>
                <View style={{flexDirection:"row", flexWrap:"wrap"}}>
                <Text style={styles.titleText}>FRAPP</Text>
                </View>
            
            </View>
        <View style={{flexDirection:"row", flexWrap:"wrap"}}>
            <Text style={styles.subheading1}>TRY OUR </Text><Text style={styles.subheading2}>COOL Frames</Text>

        </View>
        <View style={styles.cameraStyle}>
            <Camera style={{flex:1}}
            type={Camera.Constants.Type.front}
            FaceDetectorSettings={{
                mode:FaceDetector.Constants.Mode.fast,
                detectLandmarks:FaceDetector.Constants.Landmarks.all,
                runClassifications:FaceDetector.Constants.all
            }}
            
            onFacesDetected={this.onFacesDetected}
            
            onFacesDetectionError={this.onFacesDetectionError}
            
         
            />

{  this.state.faces.map(face=>{
                return <Filter1 key={face.faceID} face={face} />
            })}






{  this.state.faces.map(face=>{
    if(this.state.current_filter==="Filter_1"){
        return <Filter1 key={face.faceID} face={face}/>
    }
    else if(this.state.current_filter==="Filter_2"){
        return <Filter2 key={face.faceID} face={face}/>
    }   
            
    else if(this.state.current_filter==="Filter_3"){
        return <Filter3 key={face.faceID} face={face}/>
    } 
    else if(this.state.current_filter==="Filter_4"){
        return <Filter4 key={face.faceID} face={face}/>
    } 
    else if(this.state.current_filter==="Filter_5"){
        return <Filter5 key={face.faceID} face={face}/>
    } 
            })}
        </View>


<View style={styles.framesContainer}>
    <ScrollView style={{flexDirection:"row"}} horizontal showsHorizontalScrollIndicator={false}>
        {
            data.map(filter_data=>{
                return(
                    <TouchableOpacity style={styles.filterImageContainer} 
                    onPress={()=>this.setState({
                        current_filter:`filter_${filter_data.id}`

                    })}><Image source={filter_data.image} style={{height:22,width:80}}></Image></TouchableOpacity>
                )
            })
        }
    </ScrollView>
</View>
        </View>
        )
    }

   

}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    safearea:{
        marginTop:Platform.OS==="android"?StatusBar.currentHeight:0,

    },

    headingContainer:{
        flex:0.15,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"black",

    },
titleText:{
    fontSize:RFValue(30),
    fontWeight:"bold",
    color:"red",
    fontStyle:"italic",
    textShadowColor:'rgba(0, 0, 0, 0.75)',
    textShadowOffset:{width:-3,height:3},
    textShadowRadius:1

},
subheading1:{
fontSize:RFValue(20),
fontWeight:"300",
color:"red",
fontStyle:"italic",
textShadowColor:'rgba(0, 0, 0, 0.75)',
textShadowOffset:{width:-3,height:3},
textShadowRadius:1
},
subheading2:{
    fontWeight:"300",
    color:"red",
    fontStyle:"italic",
    textShadowColor:'rgba(0, 0, 0, 0.75)',
    textShadowOffset:{width:-3,height:3},
    textShadowRadius:1
},

cameraStyle:{
    flex:0.65,
    
},
framesContainer:{
    flex:0.2,
    paddingLeft:RFValue(20),
    paddingRight:RFValue(20),
    paddingTop:RFValue(30),
    backgroundColor:"green"
},

filterImageContainer:{
    height:RFPercentage(8),
    width:RFPercentage(15),
    justifyContentL:"center",
    alignItems:"center",
    backgroundColor:"grey",
    borderRadius:30,
    marginRight:20,
    
}
})