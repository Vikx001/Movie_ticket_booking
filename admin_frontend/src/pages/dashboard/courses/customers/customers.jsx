import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export function Customers() {
    const [customerList, setCustomerList] = useState([]); //Hello This is set to ok

    useEffect(() => {
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/customers`; // Your API endpoint
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => setCustomerList(data.data))
          .catch(error => console.error("Failed to fetch data:", error));
      }, []);


      const handleDeleteClick = async (e, itemId) => {
        e.preventDefault(); // Prevent the default anchor behavior
        const isConfirmed = confirm('Are you sure?');
        if( isConfirmed ){
            const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/customers/${itemId}`; // Your API endpoint
            const response = await fetch(apiUrl, {
                method: 'DELETE', // or 'PUT' if you are updating an existing record
                headers: {
                  'Content-Type': 'application/json',
                  // Include other headers as needed, like authorization tokens
                }
              });
          
              if (!response.ok) {
                alert("Unable to perfoem delete !!");
                return false;
              }
              //window.location.href = '/dashboard/customers';
        }

      };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
            <Typography variant="h6" color="white" className="flex-1">
             Customer Listing
            </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["fullname", "email address", "phone",  "created date", "status", "", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customerList.map(
                ({ full_name, email_id, phone_no, created_at, status, id}, key) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={`${id}-tr`}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {full_name}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {email_id}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {phone_no}
                        </Typography>
                      </td>  
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {created_at}
                        </Typography>
                      </td>                                          
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={status ? "green" : "blue-gray"}
                          value={status ? "Active" : "Inactive"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                      <div className="flex items-center space-x-2">
                     
                        <Typography
                            as="a"
                            href={`customers/edit/${id}`}
                            className="text-xs font-semibold text-blue-gray-600"
                        >
                            Edit
                        </Typography>
                    <span>|</span>
                    
                    <Typography
                        as="a"
                        href="#"
                        onClick={(e) => handleDeleteClick(e, id)} // Assuming `itemId` is the parameter you want to pass
                        className="text-xs font-semibold text-blue-gray-600"
                        >
                        Delete
                        </Typography>
                    </div>

                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Customers;
