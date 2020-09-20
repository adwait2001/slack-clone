import { auth, firestore } from '../firebase';
import React, { useEffect, useState } from 'react';
import MainComponent  from './MainComponent'
import SideBar from './SideBar'
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  

function Slack(props){
    const {history}=props;
    const[channels,setChannels]=useState([]);
    const[currentChannel,setCurrentChannels]=useState({});
    const query = useQuery();
    const channelId = query.get('id');

    useEffect(() => {
        firestore.collection('channels').where('members','array-contains',auth.currentUser.uid).get().then((snapshot)=>{
            const channels=snapshot.docs.map(doc=>{
                return{
                    id:doc.id,
                    ...doc.data()
                }
            });
            console.log('channels '+channels);
            setChannels(channels);

            if (!channelId) {
                history.push({
                    pathname:"/",
                    search:`?id=${channels[0].id}`,
                })

            setCurrentChannels(channels[0]);
            } else {
                const filteredchannel=channels.filter((ch)=>ch.id===channelId)
                setCurrentChannels(filteredchannel[0])
            }
        }).catch((error)=>{
            console.log(error)
        })
    }, [channelId]);
    return(
        <div id="slack">
            <SideBar channels={channels}/>
            <MainComponent channels={currentChannel}/>
        </div>
    )
}

export default Slack;