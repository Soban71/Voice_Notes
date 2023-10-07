import { View, Text ,StyleSheet,TouchableOpacity,Image, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import Voice from '@react-native-voice/voice';

export default function App() {

  const [Start,setStart]=useState('')
  const [Stop,setStop]=useState('')
  const [Result,setResult]=useState([])

  useEffect(()=>{
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;


    return()=>{
      Voice.destroy().then(Voice.removeAllListeners)
    }

  },[])

  const onSpeechStart = e => {
    console.log('SpeechStart:', e);
    setStart('start');
  }
  
  const onSpeechEnd = e => {
    console.log('SpeechEnd:', e);
    setStop('End');
  }
  
  const onSpeechResults= e => {
    console.log('SpeechResult:', e);
    setResult(e.value);
  }
  
  const StartRecognizing = async () => {
    try {
      console.log('Starting voice recognition...');
      await Voice.start('en-US');
      setStart('');
      setStop('');
      setResult([]);
      console.log('Voice recognition started successfully.');
    } catch (error) {
      console.log('Error starting voice recognition:', error);
    }
  }
  
  const StopRecognizing = async () => {
    try {
      console.log('Stopping voice recognition...');
      await Voice.stop();
      await Voice.destroy();
      setStart('');
      setStop('');
      setResult([]);
      console.log('Voice recognition stopped successfully.');
    } catch (error) {
      console.log('Error stopping voice recognition:', error);
    }
  }
  


  return (
    <View style={{flex:1}}>
      <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold',marginTop:12}}>
      Voice to Text Conversion
      </Text>
    <TouchableOpacity style={{alignSelf:'center'}}
    onPress={()=>{
      StartRecognizing();
    }}
    >
     <Image 
     style={{width:100,height:100,marginTop:30}}
     source={require('./Images/Micimage.png')}   />
    </TouchableOpacity>

    <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:27}}>

          <Text>Started {Start}  </Text>
          <Text>Ended {Stop}     </Text>

    </View>

    <ScrollView horizontal style={{alignSelf:'center',marginTop:50}}>
    {
      Result.map(item=>{
        return(
          <Text style={{textAlign:'center'}}>{item}</Text>
        )
      })
    }

    </ScrollView>

    
  <TouchableOpacity 
  style={{width:'100%',height:60,justifyContent:'center',
  alignItems:'center',backgroundColor:'black',position:'absolute',bottom:0}}
  onPress={()=>{
     StopRecognizing();
    }}
  >
    <Text style={{color:'white'}}>Stop</Text>
  </TouchableOpacity>
    </View>
  )
}




