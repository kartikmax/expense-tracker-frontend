import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnChanges {

  @Input() chartData: { labels: string[], series: number[], colors: string[] } = {
    labels: [], series: [], colors: []
  };

  pieChartOptions: any = {};

  ngOnChanges() {
    if (this.chartData.series.length) {
      this.buildChart();
    }
  }

  buildChart() {
    this.pieChartOptions = {
      series: this.chartData.series,
      chart: { type: 'donut', height: 220, toolbar: { show: false } },
      labels: this.chartData.labels,
      colors: this.chartData.colors,
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              total: {
                show: true, label: 'Total',
                fontSize: '12px', color: '#9ca3af',
                formatter: () => '100%'
              },
              value: { fontSize: '20px', fontWeight: '700', color: '#111827' }
            }
          }
        }
      },
      legend: { show: false },
      dataLabels: { enabled: false },
      stroke: { width: 2, colors: ['#ffffff'] }
    };
  }

  get pieLabels() { return this.chartData.labels; }
  get pieSeries() { return this.chartData.series; }
  get pieColors() { return this.chartData.colors; }
}