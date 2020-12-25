import clsx from 'clsx';
import React, { MouseEvent, FocusEvent, useState } from 'react';
import { DropdownButton } from 'react-bootstrap';
import { ProductInterface } from '../../shared/interface';
import classes from './ProductItem.module.scss';
import images from 'assets/img';

interface Props {
  item: ProductInterface;
  active: boolean;
  readonly: boolean;
  selected: boolean;
  disabled: boolean;
  action?: JSX.Element;
  onClick(event: MouseEvent): void;
}

function ProductItem(props: Props): JSX.Element {
  const [showAction, setShowAction] = useState<boolean>(false);
  const onClickParent = (event: MouseEvent) => {
    console.log('onClickParent');
    props.onClick(event);
  };
  const onClickAction = (event: MouseEvent) => {
    setShowAction(true);
  };
  const onBlurAction = (event: FocusEvent) => {
    setTimeout(() => {
      setShowAction(false);
    }, 300);
  };
  return (
    <div
      className={clsx(
        classes.item,
        props.active ? classes.active : '',
        props.readonly ? classes.readonly : '',
      )}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        className={clsx(props.active ? classes.active : '', props.readonly ? classes.readonly : '')}
        onClick={onClickParent}
      />
      <div className={classes.statusBox}>
        {props.disabled && <div className={classes.disabled}>Disabled</div>}
        {props.readonly && <div className={classes.readonly}>Already Added</div>}
      </div>
      {!!props.action && (
        <div className={classes.actionButton}>
          <DropdownButton
            show={showAction}
            alignRight={true}
            onClick={onClickAction}
            onBlur={onBlurAction}
            title={<span className="material-icons">more_horiz</span>}
            id={props.item.id}>
            {props.action}
          </DropdownButton>
        </div>
      )}

      <div className={classes.imageBox}>
        <img
          src={props.item.image || images.picturePlaceholder}
          alt={props.item.title}
          title={props.item.title}
          onError={(event) => {
            event.persist();
            event.currentTarget.src = images.picturePlaceholder;
          }}
        />
      </div>
      <div className={classes.itemFooter}>
        <div className={classes.itemFooter}>
          <div className={classes.titleBox}>
            <div className={classes.title}>
              <span>{props.item.title}</span>
            </div>
          </div>
        </div>
        <div className={classes.priceBox}>₪{props.item.retail}</div>
      </div>
    </div>
  );
}

export default ProductItem;
