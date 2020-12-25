import images from 'assets/img';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import './HelpAndSupport.scss';
import { PageTitle } from '../../components';
import { LanguageContext } from '../../context';

function HelpAndSupport(): JSX.Element {
  const languageContext = useContext(LanguageContext.Context);
  return (
    <>
      <PageTitle
        title={languageContext.state.lang === 'en' ? 'Questions & Answers' : 'שאלות ותשובות'}
      />
      <div className="row no-gutters is-header">
        <div className={clsx('col-6 videos-header')}>
          <p
            className={clsx({
              'text-right': languageContext.state.direction === 'rtl',
              'text-left': languageContext.state.direction === 'ltr',
            })}>
            {languageContext.state.lang === 'en' && <>Instructional Videos</>}
            {languageContext.state.lang === 'he' && <>רבסהינוטרס</>}
          </p>
        </div>
        <div
          className={clsx('col-6 clear-all', {
            'text-right': languageContext.state.direction === 'ltr',
            'text-left': languageContext.state.direction === 'rtl',
          })}>
          <a href="#">
            {languageContext.state.lang === 'en' && <>View All</>}
            {languageContext.state.lang === 'he' && <>צפה בהכל</>}
          </a>
        </div>
      </div>
      <div className="video-main">
        <ul>
          <li>
            <div className="videos v-content">
              <img src={images.playIcon} />
            </div>
            <p>Important to Know</p>
          </li>
          <li>
            <div className="videos v-content">
              <img src={images.playIcon} />
            </div>
            <p>Important to Know</p>
          </li>
          <li>
            <div className="videos v-content">
              <img src={images.playIcon} />
            </div>
            <p>Important to Know</p>
          </li>
          <li>
            <div className="videos v-content">
              <img src={images.playIcon} />
            </div>
            <p>Important to Know</p>
          </li>
          <li>
            <div className="videos v-content">
              <img src={images.playIcon} />
            </div>
            <p>Important to Know</p>
          </li>
        </ul>
      </div>
      <div className="border-bottm">
        <p>
          {languageContext.state.lang === 'en' && <>Queston & Answers</>}
          {languageContext.state.lang === 'he' && <>שאלות ותשובות</>}
        </p>
      </div>
      <Accordion>
        <Card>
          <Card.Header
            className="card-header"
            style={{
              backgroundImage: 'linear - gradient(to right #1e65b3 0%, #1e85b3)',
              color: '#ffff',
              fontSize: '12px',
            }}>
            <Accordion.Toggle as={Button} variant="link" eventKey="0" className="card-btn">
              <div className="up-down-arrow">
                <img src={images.ndownarrow} />
              </div>
              How to Sell More & Increase Sales
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="card-body">
              test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              testy
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header
            className="card-header"
            style={{
              backgroundImage: 'linear - gradient(to right #1e65b3 0%, #1e85b3)',
              color: '#ffff',
              fontSize: '12px',
            }}>
            <Accordion.Toggle as={Button} variant="link" eventKey="1" className="card-btn">
              How to Sell More & Increase Sales
              <div className="up-down-arrow">
                <img src={images.ndownarrow} />
              </div>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              testy
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header
            className="card-header"
            style={{
              backgroundImage: 'linear - gradient(to right #1e65b3 0%, #1e85b3)',
              color: '#ffff',
              fontSize: '12px',
            }}>
            <Accordion.Toggle as={Button} variant="link" eventKey="2" className="card-btn">
              How to Sell More & Increase Sales
              <div className="up-down-arrow">
                <img src={images.ndownarrow} />
              </div>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              testy
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header
            className="card-header"
            style={{
              backgroundImage: 'linear - gradient(to right #1e65b3 0%, #1e85b3)',
              color: '#ffff',
              fontSize: '12px',
            }}>
            <Accordion.Toggle as={Button} variant="link" eventKey="3" className="card-btn">
              How to Sell More & Increase Sales
              <div className="up-down-arrow">
                <img src={images.ndownarrow} />
              </div>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              testy
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header
            className="card-header"
            style={{
              backgroundImage: 'linear - gradient(to right #1e65b3 0%, #1e85b3)',
              color: '#ffff',
              fontSize: '12px',
            }}>
            <Accordion.Toggle as={Button} variant="link" eventKey="4" className="card-btn">
              How to Sell More & Increase Sales
              <div className="up-down-arrow">
                <img src={images.ndownarrow} />
              </div>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="4">
            <Card.Body>
              test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              testy
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header
            className="card-header"
            style={{
              backgroundImage: 'linear - gradient(to right #1e65b3 0%, #1e85b3)',
              color: '#ffff',
              fontSize: '12px',
            }}>
            <Accordion.Toggle as={Button} variant="link" eventKey="5" className="card-btn">
              How to Sell More & Increase Sales
              <div className="up-down-arrow">
                <img src={images.ndownarrow} />
              </div>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="5">
            <Card.Body>
              test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              test test test testtest test testtest test testtest test testtest test testtest test
              testtest test testtest test testtest test testtest test testtest test testtest test
              testy
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
}

export default HelpAndSupport;
