
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { AppRegistration, Star, StarHalf } from '@mui/icons-material';
import styled from 'styled-components';
import LoginModal from "../Navigation/LoginModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 37.5rem;
  min-width: 17.3rem;
  color: #1c1d1f;
`;

const CourseImgWrapper = styled.div`
  width: 100%;
`;

const CourseImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;

const CourseTextWrapper = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.4;
  width: 100%;
`;

const CourseTitle = styled.h3`
  font-size: 1.6rem;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  margin-top: 0.8rem;
  margin-bottom: 0.4rem;
  letter-spacing: -0.02rem;
  font-weight: 700;
  line-height: 1.2;
`;

const CourseDes = styled.div`
  height: 18px;
  font-size: 1.2rem;
  line-height: 1.4;
  margin: 0;
  margin-bottom: 0.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CourseRateWrapper = styled.div`
  display: flex;
  margin-bottom: 0.4rem;
`;

const CourseRateScore = styled.span`
  margin-right: 0.4rem;
  color: #b4690e;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02rem;
  font-size: 1.4rem;
`;

const CourseRateStars = styled.div`
  display: flex;
  align-items: center;
`;

const CourseRateReviewerNum = styled.span`
  color: #6a6f73;
  margin-left: 0.4rem;
  font-weight: 400;
  line-height: 1.4;
  font-size: 1.2rem;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.4rem;
`;

const CrossOffPrice = styled.p`
  text-decoration: line-through;
  color: #787878;
  font-weight: 500;
  font-size: 1.4rem;
`;

const CoursePrice = styled.div`
  letter-spacing: -0.02rem;
  font-size: 1.6rem;
  font-weight: 700;
`;

const Course = ({ item }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentComplete, setPaymentComplete] = useState(false);
  

  const handleEnrollClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handlePayAndEnroll = () => {
    setDialogOpen(false);
    setPaymentDialogOpen(true);
  };

  const handlePaymentComplete = () => {
    if (cardNumber.length === 16 && cvv.length === 3) {
      setCardNumber('');
      setCvv('');
      setPaymentDialogOpen(false);
      setPaymentComplete(true);
    } else {
      alert('Please enter a valid 16-digit card number and a 3-digit CVV.');
    }
  };

  return (
    <Container>
      <CourseImgWrapper>
        <CourseImg src={item.img} alt={item.title} />
      </CourseImgWrapper>

      <CourseTextWrapper>
        <CourseTitle>{item.title}</CourseTitle>
        <CourseDes>{item.desc}</CourseDes>

        <CourseRateWrapper>
          <CourseRateScore>{item.rateScore}</CourseRateScore>
          <CourseRateStars>
            {[...Array(5)].map((_, index) => (
              <React.Fragment key={index}>
                {index + 1 <= item.rateScore ? (
                  <Star style={{ color: '#e59819' }} />
                ) : index + 1 - item.rateScore < 1 ? (
                  <StarHalf style={{ color: '#e59819' }} />
                ) : (
                  <Star style={{ color: 'gray' }} />
                )}
              </React.Fragment>
            ))}
          </CourseRateStars>
          <CourseRateReviewerNum>({item.reviewerNum})</CourseRateReviewerNum>
        </CourseRateWrapper>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <PriceWrapper>
            {item.onSale ? (
              <>
                <CoursePrice>€{item.onSalePrice}</CoursePrice>
                &nbsp;&nbsp;
                <CrossOffPrice>€{item.price}</CrossOffPrice>
              </>
            ) : (
              <CoursePrice>€{item.price}</CoursePrice>
            )}
          </PriceWrapper>

          <button
            onClick={handleEnrollClick}
            style={{
              padding: '8px 12px',
              fontSize: '14px',
              cursor: 'pointer',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#1c1d1f',
              color: 'white',
            }}
          >
            Enroll <AppRegistration sx={{ fontSize: 15 }} />
          </button>
        </div>
      </CourseTextWrapper>

      <Dialog
  open={dialogOpen}
  onClose={handleCloseDialog}
  PaperProps={{
    style: {
      padding: '40px', 
      minWidth: '40%', 
      maxWidth: '600px', 
      borderRadius: '20px', 
      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', 
      backdropFilter: 'blur(5px)', 
    },
  }}
>
  <DialogTitle
    style={{
      fontWeight: '600',
      fontSize: '24px', 
      color: '#333', 
      textAlign: 'center', 
    }}
  >
    Enroll in {item.title}?
  </DialogTitle>
  <DialogContent
    dividers
    style={{
      backgroundColor: '#f9f9f9', 
      color: '#333', 
      fontSize: '18px', 
      lineHeight: '1.6', 
    }}
  >
    <p>Are you sure you want to enroll in this course for {item.onSale ? `€${item.onSalePrice}` : `€${item.price}`}?</p>
    <p>Course Rating: {item.rateScore} stars</p>
  <p>Teacher: {item.desc}</p>
    <p>About: {item.shortdesc}</p>
  </DialogContent>
  <DialogActions
    style={{
      justifyContent: 'center', 
    }}
  >
    <Button onClick={handleCloseDialog} color="primary" variant="outlined" style={{marginRight: '10px'}}>
      Cancel
    </Button>
    <Button onClick={handlePayAndEnroll} color="primary" variant="contained">
      PAY and ENROLL
    </Button>
  </DialogActions>
</Dialog>
<Dialog
  open={paymentDialogOpen}
  onClose={() => setPaymentDialogOpen(false)}
  PaperProps={{
    style: {
      borderRadius: '20px', 
      padding: '24px', 
      minWidth: '320px', 
    },
  }}
>
  <DialogTitle style={{ textAlign: 'center' }}>Select Payment Method</DialogTitle>
  <DialogContent>
    <form noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <label htmlFor="cardNumber" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Card Number:</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={cardNumber}
          onChange={e => setCardNumber(e.target.value)}
          maxLength="16"
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px', 
            border: '1px solid #ccc', 
            fontSize: '16px', 
          }}
        />
      </div>
      <div>
        <label htmlFor="cvv" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>CVV:</label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          value={cvv}
          onChange={e => setCvv(e.target.value)}
          maxLength="3"
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
      </div>
      <div>
        <p>Your total amount is: <strong>€{item.onSale ? item.onSalePrice : item.price}</strong></p>
      </div>
    </form>
  </DialogContent>
  <DialogActions style={{ justifyContent: 'center' }}>
    <Button onClick={() => setPaymentDialogOpen(false)} color="primary" variant="outlined" style={{ margin: '0 8px' }}>
      Close
    </Button>
    <Button onClick={handlePaymentComplete} color="primary" variant="contained" style={{ margin: '0 8px' }}>
      Complete Payment
    </Button>
  </DialogActions>
</Dialog>


      {paymentComplete && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(145deg, #ffffff, #f0f0f0)', 
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          width: 'clamp(300px, 50%, 500px)', 
          textAlign: 'center', 
        }}>
          <svg style={{ height: '64px', marginBottom: '20px' }} fill="#4caf50" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg> 
          <h2 style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: '600', color: '#333' }}>Payment Complete!</h2>
          <p style={{ fontSize: '16px', color: '#555', marginBottom: '20px' }}>Your payment has been successfully processed.</p>
          <Button onClick={() => setPaymentComplete(false)} color="primary" autoFocus style={{
            backgroundColor: '#4caf50', 
            padding: '10px 20px',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#43a047', 
            },
          }}>
            Close
          </Button>
        </div>
      )}

    </Container>
  );
};

export default Course;





