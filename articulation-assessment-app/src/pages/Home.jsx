// Home.js
import React, { useEffect } from 'react';
import "./css/Home.css";
import "../App.css"; 
import { CodeLoginComponent, InformationComponent, AmountUsersComponent,ForumPostComponent } from "../components/Index";


const Home = () => {
  useEffect(() => {
    const background = document.querySelector('.background');
    if (background) {
      background.style.height = '450px'; 
    }

    return () => {
      if (background) {
        background.style.height = '';
      }
    };
  }, []);
  return (
    <div className="container">
      <div className="flex-container">
        <CodeLoginComponent/>
      </div>
      <div className="flex-container">
        <InformationComponent/>
      </div>
      <div className="flex-container-amount">
        <div className='container'>
          <div className="flex-container-text">
            <p className="amount-p">Users</p>
            </div>
            <div className="flex-container-explain">
            <p className="amount">The amount of users using the platform now</p>
            </div>
            <div className="flex-container-box-line">
            <hr className='amount'/>
          </div>
          <div className="flex-container-box">
            <AmountUsersComponent Type="Children"/>
            <AmountUsersComponent Type="Speech therapists"/>
            <AmountUsersComponent Type="Organisations"/>
          </div>
        </div>
      </div>
      <div className="flex-container-long">
      <div className='container'>
          <div className="flex-container-box-text">
            <p className="amount-p">Latest forum posts</p>
            </div>
            <div className="flex-container-explain">
            <p className="amount">The latest forum posts uploaded from parents and speech therapists</p>
            </div>
            <div className="flex-container-box-line">
            <hr className='amount'/>
          </div>
          <div className="flex-container-box">
            <ForumPostComponent number_latest={1}/>
            <ForumPostComponent number_latest={2}/>
            <ForumPostComponent number_latest={3}/>
            <ForumPostComponent number_latest={4}/>
          </div>
        </div>
      </div>
    </div>
 );
}

export default Home;
