import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Organizer {
  createdAt: any // Assuming 'createdAt' is a string date
}


@Component({
  selector: 'app-organisaer-home',
  templateUrl: './organisaer-home.component.html',
  styleUrls: ['./organisaer-home.component.css']
})
export class OrganisaerHomeComponent implements OnInit {
  totalPackage: number = 0;
  totalCurrency: number = 0;
  totalOrders: number = 0;

  createdAt: any[] = []; // Use the correct type here
  users: any[] = [];
  organizers: Organizer[] = [];
  constructor(private http: HttpClient ,private router: Router) { }

  ngOnInit(): void {
   const organisaerId = localStorage.getItem('organisaerId');

    this.http.get<any[]>('http://localhost:5000/users').subscribe(
      (response) => {
        this.users = response;
        this.processUserDataForChart(response);
      },
      (error) => {
        console.error(error);
      }
    );
  
    this.http.get<any[]>(`http://localhost:5000/organisaer/eventlists/${organisaerId}`)
  .subscribe(
    (response) => {
      this.organizers = response; // Assuming response is in the expected format
      console.log(response);

      this.processOrganizerDataForChart(response);
    },
    (error) => {
      console.error(error);
    }
  );

    
  }


  processUserDataForChart(users: any[]) {
    const userGrowthMap = new Map<string, number>();
   console.log(users);
   
    users.forEach((user) => {
      const createdAt = new Date(user.createdAt);
      const createdAtString = createdAt.toISOString().split('T')[0];
      console.log( createdAt);
      if (userGrowthMap.has(createdAtString)) {
        userGrowthMap.set(
          createdAtString,
          userGrowthMap.get(createdAtString)! + 1
        );
      } else {
        userGrowthMap.set(createdAtString, 1);
      }
    });

    const userGrowthData = Array.from(userGrowthMap).map(([date, count]) => ({
      x: date,
      y: Number(count), // Parse the count as a number
    }));
    console.log(  userGrowthData);
    userGrowthData.sort(
      (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime()
    );

    let dataByMonth: any = {};

    // Iterate through datapoints and populate dataByMonth
    userGrowthData.forEach((datapoint) => {
      const date = new Date(datapoint.x);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Months are 0-indexed

      const key = `${year}-${month.toString().padStart(2, '0')}`;
      console.log(dataByMonth[month]);

      if (dataByMonth[key]) {
        dataByMonth[key].y += datapoint.y;
      } else {
        dataByMonth[key] = { x: key, y: datapoint.y };
      }
    });

    const allMonths = Array.from({ length: 12 }, (_, i) =>
      (i + 1).toString().padStart(2, '0')
    );

    // Check for missing months and add them
    const missingMonths = allMonths.filter(
      (month) => !dataByMonth[`2023-${month}`]
    );
    console.log(missingMonths);

    missingMonths.forEach((month) => {
      dataByMonth[month] = { x: `2023-${month}`, y: 0 };
    });

    // Extract the values from dataByMonth into an array
    const resultArray = Object.values(dataByMonth);

    const formattedData = resultArray.map((item: any) => {
      const [year, month] = item.x.split('-');
      return {
        y: item.y,
        x: new Date(Number(year), Number(month) - 1), // Month is zero-based
      };
    });

    this.data = formattedData;
    this.createChart(formattedData);
  }
    


  chartOptions: any = '';

  data: any = ' ';

  createChart(formattedData: any): void {
    // Process user data and create userGrowthData

    console.log(formattedData);

    let chartOption = {
      title: {
        text: 'User Growth Over Time',
      },

      axisX: {
        title: 'Date',
      },
      axisY: {
        title: 'Number of Users',
      },
      data: [
        {
          type: "splineArea", 
          showInLegend: true,
          name: "Salaries",
          markerSize: 0,
          color: "rgba(54,158,173,.9)",
          dataPoints: formattedData,
        },
      ],
    };
    console.log(chartOption);

    this.chartOptions = chartOption;
  }


  processOrganizerDataForChart(organizers: any, createdAt: string[] = []) {
    // Process organizer data and create organizerGrowthData
    const organizerGrowthMap = new Map<string, number>();
  
    // Access the 'createdAt' property and iterate over the timestamps
    organizers.createdAt.forEach((timestamp: string | number | Date) => {
      const createdAt = new Date(timestamp);
      const createdAtString = createdAt.toISOString().split('T')[0];
  
      if (organizerGrowthMap.has(createdAtString)) {
        organizerGrowthMap.set(
          createdAtString,
          organizerGrowthMap.get(createdAtString)! + 1
        );
      } else {
        organizerGrowthMap.set(createdAtString, 1);
      }
    });
  
    const organizerGrowthData = Array.from(organizerGrowthMap).map(([date, count]) => ({
      x: date,
      y: Number(count), // Parse the count as a number
    }));
 console.log( organizerGrowthData);
      
    organizerGrowthData.sort(
      (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime()
    );

    let dataByMonth: any = {};

    // Your chart creation code for the organizer chart...
    organizerGrowthData.forEach((datapoint) => {
      const date = new Date(datapoint.x);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Months are 0-indexed

      const key = `${year}-${month.toString().padStart(2, '0')}`;
      console.log(dataByMonth[month]);

      if (dataByMonth[key]) {
        dataByMonth[key].y += datapoint.y;
      } else {
        dataByMonth[key] = { x: key, y: datapoint.y };
      }
    });

    const allMonths = Array.from({ length: 12 }, (_, i) =>
      (i + 1).toString().padStart(2, '0')
    );

    const missingMonths = allMonths.filter(
      (month) => !dataByMonth[`2023-${month}`]
    );
    console.log(missingMonths);

    missingMonths.forEach((month) => {
      dataByMonth[month] = { x: `2023-${month}`, y: 0 };
    });
    const resultArray = Object.values(dataByMonth);

    const formattedData = resultArray.map((item: any) => {
      const [year, month] = item.x.split('-');
      return {
        y: item.y,
        x: new Date(Number(year), Number(month) - 1), // Month is zero-based
      };
    });
    this.data = formattedData;
    this.createOrganizerChart(formattedData);
  }


  organizerChartOptions: any = '';


  createOrganizerChart(formattedData: any): void {
    // Process organizer data and create organizerGrowthData
  
    console.log(formattedData);
  
    let chartOption = {
      title: {
        text: 'Organizer Growth Over Time',
      },
  
      axisX: {
        title: 'Date',
      },
      axisY: {
        title: 'Number of Organizers',
      },
      data: [
        {
          type: 'line', // Change the chart type to 'column'
          xValueFormatString: 'YYYY',
          yValueFormatString: '$#,###.##',
          dataPoints: formattedData,
        },
      ],
    };
    console.log(chartOption);
  
    this.organizerChartOptions = chartOption;
  }
  






  dashboardData(organisaerId: string | null): void {
    if (!organisaerId) {
      console.error('organisaerId is not available.');
      return;
    }
    
    this.http.get<any>(`http://localhost:5000/organisaer/dashboardData/${organisaerId}`)
      .subscribe(
        (data: any) => {
          console.log('Fetched dashboard data:', data);
          this.totalPackage = data.totalPackage;
          this.totalCurrency = data.totalCurrency;
          this.totalOrders = data.totalOrders;
         
        },
        (error: any) => {
          console.error('Error fetching booking data:', error);
        }
      );
  }
  
  navigateToChat(): void {
    // Retrieve the userId from local storage
    const sender_id = localStorage.getItem('organisaerId');

    const  receiver_id = localStorage.getItem('adminId');
    // Check if userId is available
    if (sender_id) {
      // Create an object to send both organisaerId and userId to the backend
      const data = {
        sender_id,
        receiver_id 
      };

      console.log(data);
      

      // Make an HTTP request to the backend and send the data
      this.http.post('http://localhost:5000/admin/createNewChatRoom', data).subscribe(
        (response) => {
          // Handle the response from the backend if needed
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
      console.log(receiver_id);
      

      // Navigate to the chat component
      this.router.navigate(['organsierchat']);
    } else {
      console.error('userId is not available in local storage.');
    }
  }

  logout() {
    // Remove the JWT token and adminId from localStorage or perform any other logout actions
    localStorage.removeItem('orgaisertoken');
    localStorage.removeItem('organisaerId'); // Assuming you store the admin's ID as 'adminId'
    
    // Optionally clear other admin-related data from localStorage
    // Redirect to the login page or any other desired route
    this.router.navigate(['organisaerlogin']); // Replace 'login' with your login route
  }
  
  

}
