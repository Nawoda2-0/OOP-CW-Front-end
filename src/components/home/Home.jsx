import React, {useEffect, useState} from "react";
import './Home.css';
import Pause from '../../assets/stop.svg';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';



const Home = () => {

  const [maxTicketArraySize, setMaxTicketArraySize] = useState(0);
  const [totalTicketArraySize, setTotalTicketArraySize] = useState(0);
  const [maxTicketCapacity, setMaxTicketCapacity] = useState(0);

  useEffect(() => {
    let socket;

    const connectWebSocket = () => {
      socket = new WebSocket("ws://localhost:8080/ticket-updates");

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMaxTicketArraySize(data.maxTicketArraySize);
        setTotalTicketArraySize(data.totalTicketArraySize);
        setMaxTicketCapacity(data.maxTicketCapacity);
      };

      socket.onclose = () => {
        console.error("WebSocket closed. Reconnecting...");
        // setTimeout(connectWebSocket, 1000);
      };
    };

    connectWebSocket();

    return () => {
      if (socket) socket.close();
    };
  }, []);


  const settings = {
    width: 100,
    height: 100,
    
  };

  const settings2 = {
    width: 200,
    height: 200,
    value: 60,
  };
  

  return (
    <div className='home row'>
      <div className='col-xxl-4 col-xl-4 col-lg-6 col-md-12 Citem maxCard'>
        <div className='maxContainer'>
          <div className='con1'>Available ticket to produce</div>
          <div className='con2'>{maxTicketArraySize}/{maxTicketCapacity}</div>
          <div className='con3'> {(100-((maxTicketArraySize / maxTicketCapacity) * 100)).toFixed(2)}% of ticket produced</div>
        </div>
      </div>
      <div className='col-xxl-4 col-xl-3 col-lg-5  col-md-12 Citem totalCard'>
        <div className='maxContainer maxShared'>
          <div>
            <div className='con1'>Shared Ticket Pool</div>
            <div className='con2'>{totalTicketArraySize}</div>
            <div className='con3'>
              Available in the pool
            </div>
          </div>
          <div>
          <Gauge
          value= {totalTicketArraySize}
      {...settings}
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 12,
        },
        [`& .${gaugeClasses.valueText} text`]: {
          fill: "#fff" // <-- change text color
        },
      })}
    />
          </div> 
        </div>
      </div>
      <div className='col-xxl-3 col-xl-3 col-lg-12 col-md-12 Citem playCard'>
        <div className='playContainer'>
          <div className='conP2'>
            <h2 className="soldCard">{(maxTicketCapacity-maxTicketArraySize)-totalTicketArraySize}</h2>
            </div>
          <div className='conP'>Ticket Sold</div>
        </div>
      </div>
  
    </div>
  )
}

export default Home