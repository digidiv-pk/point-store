import { CourierImages } from 'assets/img';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { TransportationType } from '../../../../shared/enum';
import {
  OrderEstimateRequestInterface,
  OrderEstimateResponseInterface,
  TransportInterface,
} from '../../../../shared/interface';
import { API } from '../../../../utility';
import { Loading } from '../../../index';

interface Props {
  estimateData: OrderEstimateRequestInterface;
  error: string;
  next(transport: TransportationType, instructions: string): void;
}

interface State {
  courierType: TransportationType;
  instructions: string;
}

function CourierService(props: Props): JSX.Element {
  const [state, setState] = useState<State>({
    courierType: TransportationType.BiCycle,
    instructions: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [estimatedCost, setEstimatedCost] = useState<OrderEstimateResponseInterface | undefined>();
  useEffect(() => {
    setLoading(true);
    API.Order.estimate(props.estimateData)
      .then((response) => {
        console.log(response);
        setEstimatedCost(response.data);
        setLoading(false);
        console.log(estimatedCost);
      })
      .catch((error) => {
        console.error(error.response);
        setLoading(false);
      });
  }, []);

  const getCost = (transport: TransportationType): TransportInterface => {
    return (estimatedCost as OrderEstimateResponseInterface).transport.find(
      (item) => item.transport === transport,
    ) as TransportInterface;
  };

  const selectCourierType = (transport: TransportationType) => {
    setState({
      ...state,
      courierType: transport,
    });
  };
  return (
    <>
      {loading && <Loading />}
      <div className="dialog-title">Courier Type</div>
      <div className="dialog-desc">Choose the type of courier for your delivery</div>
      {!!estimatedCost && (
        <div className="courier-items">
          <div
            className={clsx('item', state.courierType === TransportationType.Car ? 'selected' : '')}
            onClick={() => selectCourierType(TransportationType.Car)}>
            <div className="title">Up to 50 items</div>
            <div className="imageBox">
              <img
                src={
                  state.courierType === TransportationType.Car
                    ? CourierImages.courierCarSelected
                    : CourierImages.courierCar
                }
                alt={TransportationType.Car}
              />
            </div>
            <div className="price">{getCost(TransportationType.Car).cost}</div>
          </div>
          <div
            className={clsx(
              'item',
              state.courierType === TransportationType.MotorCycle ? 'selected' : '',
            )}
            onClick={() => selectCourierType(TransportationType.MotorCycle)}>
            <div className="title">Up to 20 items</div>
            <div className="imageBox">
              <img
                src={
                  state.courierType === TransportationType.MotorCycle
                    ? CourierImages.courierMotorcycleSelected
                    : CourierImages.courierMotorcycle
                }
                alt={TransportationType.MotorCycle}
              />
            </div>
            <div className="price">{getCost(TransportationType.MotorCycle).cost}</div>
          </div>
          <div
            className={clsx(
              'item',
              state.courierType === TransportationType.BiCycle ? 'selected' : '',
            )}
            onClick={() => selectCourierType(TransportationType.BiCycle)}>
            <div className="title">Up to 5 items</div>
            <div className="imageBox">
              <img
                src={
                  state.courierType === TransportationType.BiCycle
                    ? CourierImages.courierBicycleSelected
                    : CourierImages.courierBicycle
                }
                alt={TransportationType.BiCycle}
              />
            </div>
            <div className="price">{getCost(TransportationType.BiCycle).cost}</div>
          </div>
        </div>
      )}
      {!!estimatedCost && (
        <h6>
          <b>EstimatedCost:-</b>{' '}
          <small>₪{getCost(state.courierType).cost + estimatedCost.retailTotal}</small>
        </h6>
      )}

      <div className="form-group">
        <textarea
          name="instructions"
          placeholder="Courier Instructions"
          value={state.instructions}
          className="form-control"
          onChange={(event) => {
            setState({
              ...state,
              instructions: event.target.value,
            });
          }}
        />
      </div>
      {!!props.error && <span className="text-danger">{props.error}</span>}

      <button
        className="btn dialog-button"
        type="button"
        disabled={!state.courierType}
        onClick={() => props.next(state.courierType, state.instructions)}>
        Continue
      </button>
    </>
  );
}

export default CourierService;
