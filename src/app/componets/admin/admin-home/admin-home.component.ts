import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  // chartOptions: any;
  users: any[] = [];
  organizers: any[] = [];

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://backend.aventuraevents.site/users').subscribe(
      (response) => {
        this.users = response;
        this.processUserDataForChart(response);
      },
      (error) => {
        console.error(error);
      }
    );

    this.http.get<any[]>('https://backend.aventuraevents.site/organisaer/organisaerList')
      .subscribe(
        (response) => {
          this.organizers = response;
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

    users.forEach((user) => {
      const createdAt = new Date(user.createdAt);
      const createdAtString = createdAt.toISOString().split('T')[0];

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
          type: 'line',
          xValueFormatString: 'YYYY',
          yValueFormatString: '$#,###.##',
          dataPoints: formattedData,
        },
      ],
    };
    console.log(chartOption);

    this.chartOptions = chartOption;
  }

  processOrganizerDataForChart(organizers: any[]) {
    // Process organizer data and create organizerGrowthData
    const organizerGrowthMap = new Map<string, number>();

    organizers.forEach((organizer) => {
      const createdAt = new Date(organizer.createdAt);
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

    const organizerGrowthData = Array.from(organizerGrowthMap).map(
      ([date, count]) => ({
        x: date,
        y: Number(count), // Parse the count as a number
      })
    );

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
          type: 'column', // Change the chart type to 'column'
          xValueFormatString: 'YYYY',
          yValueFormatString: '$#,###.##',
          dataPoints: formattedData,
        },
      ],
    };
    console.log(chartOption);
  
    this.organizerChartOptions = chartOption;
  }

  logout() {
    // Remove the JWT token and adminId from localStorage or perform any other logout actions
    localStorage.removeItem('token');
    localStorage.removeItem('adminId'); // Assuming you store the admin's ID as 'adminId'
    
    // Optionally clear other admin-related data from localStorage
    // Redirect to the login page or any other desired route
    this.router.navigate(['adminlogin']); // Replace 'login' with your login route
 
  }
  
  

  
}
