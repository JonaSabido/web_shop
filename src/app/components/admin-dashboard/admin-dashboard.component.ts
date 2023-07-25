import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { BalanceSale, BalanceTotal, MoreProductSale, SaleWeek, User } from 'shared/interfaces';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

Chart.register(...registerables);


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  loading: boolean = true;
  users: User[] = []
  chartSales: any = null;
  chartProducts: any = null;
  balanceTotal: BalanceTotal = {
    total_users: 0,
    total_products: 0,
    total_sales: 0
  }

  balanceSale: BalanceSale = {
    total_absolute_today: 0,
    total_absolute_yesterday: 0,
    percentaje_earning: 0
  }

  salesWeek: SaleWeek[] = []

  moreProductSale: MoreProductSale[] = []


  constructor(
    protected service: UserService,
    protected dataService: DataService
  ) {
  }


  reload() {
    this.loading = true
    this.dataService.getLatestUsers().subscribe(response => {
      this.loading = false
      this.users = response.data
    })

  }

  ngOnInit(): void {
    this.reload()
    this.dataService.getBalanceTotals().subscribe(response => this.balanceTotal = response)
    this.dataService.getBalanceSales().subscribe(response => this.balanceSale = response)
    this.dataService.getSalesWeeks().subscribe(response => {
      this.salesWeek = response
      this.drawChartSales()
    })
    this.dataService.getProductsMoreSales().subscribe(response => {
      this.moreProductSale = response
      this.drawChartProducts()
    })
  }

  @ViewChild('chartSales') canvasSale: ElementRef = {} as ElementRef;
  drawChartSales() {
    let labels_week: string[] = []
    let data_week: number[] = []

    this.salesWeek.forEach(saleWeek => {
      labels_week.push(new Date(saleWeek.date + 'T00:00:00').toLocaleDateString('es-MX', { weekday: "short", month: "short", day: "numeric" }))
      data_week.push(saleWeek.count_sale)
    });


    const canvasSale = this.canvasSale.nativeElement;
    this.chartSales = new Chart(canvasSale, {
      type: 'line',
      data: {
        labels: labels_week,
        datasets: [{
          label: 'Total de ventas',
          data: data_week,
          backgroundColor: [
            'rgba(56, 182, 145, 0.2)',
            'rgba(56, 82, 182, 0.2)',
            'rgba(102, 182, 56, 0.2)',
            'rgba(182, 56, 104, 0.2)'
          ],
          borderColor: [
            'rgba(56, 182, 145, 1)',
            'rgba(56, 82, 182, 1)',
            'rgba(102, 182, 56, 1)',
            'rgba(182, 56, 104, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            ticks: {
              font: {
                size: 13
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Ventas de la semana',
            font: {
              size: 22
            }
          },
          tooltip: {
            padding: 20,

            bodyFont: {
              size: 18
            },
            titleFont: {
              size: 20
            }
          },
          legend: {
            labels: {
              font: {
                size: 0
              }
            }
          }
        },

      }
    });
  }

  @ViewChild('chartProducts') canvasProduct: ElementRef = {} as ElementRef;
  drawChartProducts() {
    let labels_products: string[] = []
    let data_products: number[] = []

    this.moreProductSale.forEach(moreProduct => {
      labels_products.push(moreProduct.name)
      data_products.push(moreProduct.amount_sales)
    });
    const canvasProduct = this.canvasProduct.nativeElement;
    this.chartProducts = new Chart(canvasProduct, {
      type: 'bar',
      data: {
        labels: labels_products,
        datasets: [{
          label: 'Veces vendido',
          data: data_products,
          backgroundColor: [
            'rgba(56, 182, 145, 0.2)',
            'rgba(56, 82, 182, 0.2)',
            'rgba(102, 182, 56, 0.2)',
            'rgba(182, 56, 104, 0.2)'
          ],
          borderColor: [
            'rgba(56, 182, 145, 1)',
            'rgba(56, 82, 182, 1)',
            'rgba(102, 182, 56, 1)',
            'rgba(182, 56, 104, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            ticks: {
              font: {
                size: 13
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            font: {
              size: 22
            }
          },
          tooltip: {
            padding: 20,

            bodyFont: {
              size: 18
            },
            titleFont: {
              size: 20
            }
          },
          legend: {
            labels: {
              font: {
                size: 0
              }
            }
          }
        },

      }
    });
  }

}
