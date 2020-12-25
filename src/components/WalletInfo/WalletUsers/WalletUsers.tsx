import React from 'react';
import images from '../../../assets/img';

interface Table {
  id: string;
  title: string;
  customerName: string;
  Phone: string;
  Email: string;
}

function WalletUsers(): JSX.Element {
  const table: Table[] = Array(6).fill({
    id: '1',
    title: 'admin',
    customerName: 'Gal Ganon',
    Phone: '050-240-8824',
    email: 'ganontoon@gmail.com',
  });
  return (
    <div className="user-main">
      <div className="users">
        <p>Users</p>
      </div>
      <div className="add-btn">
        <img src={images.addButton} />
      </div>
      <div className="clear" />
      <div className="table-container">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {table.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.customerName}</td>
                <td>{item.Phone}</td>
                <td>
                  {item.Email}
                  <img src={images.EditIcon} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="submit" className="btn updateSetting view-all float-right ">
        View All
      </button>
    </div>
  );
}
export default WalletUsers;
