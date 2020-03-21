import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Collapsible,
  Heading,
  Grommet,
  Layer,
  ResponsiveContext,
} from 'grommet';
import { FormClose, Notification } from 'grommet-icons';
import eyes from './img/eyes.svg';
import jarry from './img/jarry.jpg';
import mine from './img/mine.png';
import api from './api/api';
import copyToClipboard from 'copy-to-clipboard';
import { IoMdRefresh, IoIosMore, IoMdMenu, IoMdCopy } from 'react-icons/io'


const Copy = props => {
  const [color, setColor] = useState('#d6d6d6');
  console.log(props.text)
  return (
    <IoMdCopy
      size={props.size}
      style={{ color: color, cursor: 'pointer' }}
      onMouseEnter={() => setColor("#c4c4c4")}
      onMouseLeave={() => setColor('#d6d6d6')}
      onClick={() => {
        copyToClipboard(props.text);
        if (props.onCopy) { props.onCopy() }
      }}
    />
  )
}

const Refresh = props => {
  const [color, setColor] = useState('#d6d6d6');
  const [pending, setPending] = useState(false);
  return (
    <div onClick={e => {
      if (props.onClick) {
        setPending(true);
        props.onClick(e)
          .then(res => {
            setPending(false);
          })
      }
      else {
        console.log('no click func')
      }
    }}
    >{pending &&
      <IoIosMore
        size={props.size}
        style={{ color: color, cursor: 'pointer' }}
      />
      }
      {!pending &&
        <IoMdRefresh
          size={props.size}
          style={{ color: color, cursor: 'pointer' }}
          onMouseEnter={() => setColor("#c4c4c4")}
          onMouseLeave={() => setColor('#d6d6d6')} />
      }

    </div>

  )
}

const theme = {
  global: {
    colors: {
      brand: '#228BE6',
    },
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};

const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
  />
);

const App = props => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentIp, setCurrentIp] = useState("");
  const [copySuccess, setCopySuccess] = useState('');
  const ipRef = useRef(null);

  const getIp = async () => {
    try {
      const ip = await api.getCurrentIP();
      console.log('currentip')
      console.log(ip)
      setCurrentIp(ip);
    }
    catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getIp();
  }, [])
  return (
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        {size => (
          <Box fill>
            <AppBar>
              <img style={{ width: '45px', height: '45px' }} src={eyes} />

              <Heading level='3' margin='none'>
                Welcome To Jarryland!
                </Heading>

              <Button
                icon={<IoMdMenu size={30} />}
                onClick={() => setShowSidebar(!showSidebar)}
              />
            </AppBar>
            <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
              <Box flex align='stretch' justify='stretch'>
                <img src={mine} style={{ objectFit:'cover', margin: "30px auto", width:"90%", maxHeight:"40vh", height:"auto", }} />
                <div style={{ textAlign: 'center', marginBottom: '100px' }}>
                  <Refresh
                    size={25}
                    onClick={async () => {
                      console.log('click')
                      return await getIp();
                    }}
                  />
                  <h4 >Current Location</h4>
                  <h2 ref={ipRef}>{currentIp}</h2>
                  <Copy size={30} text={currentIp} onCopy={() => {setCopySuccess('Copied!'); setTimeout(setCopySuccess,1000,"" )}}/>
                  <h4 style={{ color: 'green' }}>
                    {copySuccess}
                  </h4>

                </div>
              </Box>
              {(!showSidebar || size !== 'small') ? (
                <Collapsible direction="horizontal" open={showSidebar}>
                  <Box
                    flex
                    width='medium'
                    background='light-2'
                    elevation='small'
                    align='center'
                    justify='center'
                  >
                    <img style={{ width: '100%', height: '100%' }} src={jarry} />
                  </Box>
                </Collapsible>
              ) : (
                  <Layer>
                    <Box
                      background='light-2'
                      tag='header'
                      justify='end'
                      align='center'
                      direction='row'
                    >
                      <Button
                        icon={<FormClose />}
                        onClick={() => setShowSidebar(false)}
                      />
                    </Box>
                    <Box
                      fill
                      background='light-2'
                      align='center'
                      justify='center'
                    >
                      <img style={{ width: '100%', height: '100%' }} src={jarry} />
                    </Box>
                  </Layer>
                )}
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );

}

export default App;