import React from 'react';
import images from '../../../assets/img';

function ReportsTable(): JSX.Element {
  return (
    <div className="outer-reports-table">
      <table className="table reports-table">
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Order Quantity</th>
            <th scope="col">Product Quantity.</th>
            <th scope="col">Total</th>
            <th scope="col">Download/Share</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row">September</td>
            <td className="th-center">123</td>
            <td className="th-center">1000</td>
            <td className="th-center">4900.00</td>
            <td className="th-center">
              <img src={images.DownloadICon} className="pr-2" />
              <img src={images.printIcon} className="pr-2" />
              <img src={images.messegesIcon} />
            </td>
          </tr>
          <tr>
            <td scope="row">December</td>
            <td className="th-center">123</td>
            <td className="th-center">1000</td>
            <td className="th-center">9300.00</td>
            <td className="th-center">
              <img src={images.DownloadICon} className="pr-2" />
              <img src={images.printIcon} className="pr-2" />
              <img src={images.messegesIcon} />
            </td>
          </tr>
          <tr>
            <td scope="row">March</td>
            <td className="th-center">123</td>
            <td className="th-center">1000</td>
            <td className="th-center">7600.00</td>
            <td className="th-center">
              <img src={images.DownloadICon} className="pr-2" />
              <img src={images.printIcon} className="pr-2" />
              <img src={images.messegesIcon} />
            </td>
          </tr>
          <tr className="bold">
            <td scope="row">
              <b>Total</b>
            </td>
            <td className="th-center">
              <b>369</b>
            </td>
            <td className="th-center">
              <b>3000</b>
            </td>
            <td className="th-center">
              <b>23,000</b>
            </td>
            <td className="th-center">
              <img src={images.DownloadICon} className="pr-2" />
              <img src={images.printIcon} className="pr-2" />
              <img src={images.messegesIcon} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReportsTable;
