/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable */
import {
  Card, CardMedia,
} from '@mui/material';
import React, { useState } from 'react';
import diamond from '../../assets/img/no_image.jpeg';

const GalleryView = ({ rowData }) =>
// const [displayLimit, setDisplayLimit] = useState(12);
// const [loadMoreIncrement, setLoadMoreIncrement] = useState(12);

  // Function to handle "Load More" button click
  // const handleLoadMore = () => {
  //   setDisplayLimit(displayLimit);
  // };
  (
    <div style={{
      flexWrap: 'wrap',
      display: 'flex',
      gap: '10px',
      marginLeft: '25px',
      marginBottom: '10px',
      overflow: 'auto',
      maxHeight: 'calc(100vh - 200px)', // Set a max height to enable scrolling

      /* Scrollbar customizations */
      scrollbarWidth: 'thin', // For Firefox
      scrollbarColor: 'rgb(2, 48, 103) rgb(221, 221, 221)', // Thumb color, Track color
    }}
    >
      {rowData?.map((x, index) => (

        <div key={index} style={{ flex: '0 0 calc(16.66% - 10px)', position: 'relative', border: '1px solid rgb(221, 221, 221)' }}>
          <div style={{
            color: '#fff', fontSize: '14px', 
            position: 'absolute',
             top: '0px', right: '0px', zIndex: 1,
              background: '#023067', width: '58px',
               textAlign: 'center',
              //  height: '47px',
              //  borderBottom: '1px solid red',
              //  WebkitTransform: 'translateY(17px) translateX(249px) rotate(43deg)', 
          }}
          >
            {x?.['OFFER DISC']}
            %
          </div>
          <Card sx={{ maxWidth: 250 }}>
            <a href="http://localhost:3002" target="_blank" rel="noreferrer">
              <CardMedia
                sx={{
                  height: 180,
                  cursor: 'pointer',
                }}
                image={x?.['IMAGE LINK'] ? x?.['IMAGE LINK'] : diamond}
                title="diamond"
              />
            </a>
            <div style={{ paddingLeft: '5px', marginTop: '5px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
                <span style={{ fontSize: '11px', color: '#023067', fontWeight: 600 }}>{x?.['STOCK ID']}</span>
                <span style={{ fontSize: '11px' }}>{x?.LAB}</span>
                <span style={{ fontSize: '11px' }}>{x?.CTS}</span>
                <span style={{ fontSize: '11px' }}>{x?.STATUS}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '23px' }}>
                <span style={{ fontSize: '11px' }}>{x?.COLOR}</span>
                <span style={{ fontSize: '11px' }}>{x?.CLARITY}</span>
                <span style={{ fontSize: '11px' }}>{x?.CUT}</span>
                <span style={{ fontSize: '11px' }}>{x?.POLISH}</span>
                <span style={{ fontSize: '11px' }}>{x?.SYMM}</span>
                <span style={{ fontSize: '11px' }}>{x?.['FLS INTENSITY']}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '52px' }}>
                <span style={{ fontSize: '11px' }}>{x?.LOCATION}</span>
                <span style={{ fontSize: '11px' }}>{x?.SHADE}</span>
                <span style={{ fontSize: '11px' }}>
                  {x?.['RAP AMOUNT']}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '75px' }}>
                <span style={{ fontSize: '11px' }}>
                  {x?.['PRICE PER CTS']}
                </span>
                <span style={{
                  fontSize: '11px', paddingLeft: '40px', fontWeight: 600, color: '#023067',
                }}
                >
                  $
                  {x?.['OFFER AMOUNT']}
                </span>
              </div>
            </div>
          </Card>
        </div>
      ))}

      {/* {rowData.length > displayLimit && (
      <button onClick={handleLoadMore}>Load More</button>
      )} */}
    </div>
  );
export default GalleryView;
