import React from 'react';
import { Link } from 'react-router-dom';
import { SignOut } from '../firebase';

function Sidebar(props) {
    const { channels } = props;
    
    return (
        <div id="sidebar">
            <div className="user-profile">
                <div className="avatar">
                    <img src="https://www.flaticon.com/svg/static/icons/svg/2919/2919600.svg" alt="" />
                </div>
                <div>Ronald</div>
            </div>
            <hr className="sidebar-spacer" />
            <button className="btn basic-btn margin" onClick={SignOut}>
                LOGOUT</button>
            <div className="channels">
                <div className="header">Channels</div>

                <ul className="channels-list">
                    {channels.map(channel => {
                        return (
                            <li key={channel.id}>
                               <Link to={`/?id=${channel.id}`}>#{channel.name}</Link> 
                            </li>
                        )

                    })}

                </ul>
            </div>
        </div>
    )

}

export default Sidebar;