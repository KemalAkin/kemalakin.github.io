---
title: "Exploring Dow Jones"
excerpt: "Data mining, cleaning and creating SQLite DB with Python, visualization and interactive dashboard prepared with Power BI & Tableau <br/><img src='https://github.com/Kemalakin/kemalakin.github.io/blob/master/images/dow-jones/dj_pBI.gif?raw=true' width='350'><br/>"
collection: portfolio
---
<p align="justify">
The <em> Dow Jones Industrial Average</em>, is a stock market index of 30 prominent companies listed on stock exchanges in the US. In this project, I obtain the various data of the companies in the index via web scraping (Pandas and Yahoo Finance), clean the data and create a database using Python. Finally, interactive dashboards are created using Microsoft Power BI and Tableau. <br/>

A sample output is shown below.

</p>

<p align="center">
  <img src="https://github.com/Kemalakin/kemalakin.github.io/blob/master/images/dow-jones/dj_pBI.gif?raw=true" alt="Numbers" width="99%" height="540">
</p>

<!--
<video width="99%" height="540">
        <source src="/images/dow-jones/dj_pBI.mp4" type="video/mp4">
</video>
-->

<center><iframe src="https://public.tableau.com/views/MSFTStockPrices/MicrosoftStockPrices?:language=en-US&:display_count=n&:origin=viz_share_link&:showVizHome=no&:embed=true" width="99%" height="540" frameborder="0"></iframe></center>

<br/>

Few rows and columns from the created data table is shown below.

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead tr th {
        text-align: center;
    }

    .dataframe tbody tr td {
        text-align: center;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: center;">
      <th></th>
      <th>zip</th>
      <th>sector</th>
      <th>fullTimeEmployees</th>
      <th>city</th>
      <th>state</th>
      <th>country</th>
      <th>website</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>10285</td>
      <td>Financial Services</td>
      <td>64000</td>
      <td>New York</td>
      <td>NY</td>
      <td>United States</td>
      <td>https://www.americanexpress.com</td>
    </tr>
    <tr>
      <th>2</th>
      <td>91320-1799</td>
      <td>Healthcare</td>
      <td>24200</td>
      <td>Thousand Oaks</td>
      <td>CA</td>
      <td>United States</td>
      <td>https://www.amgen.com</td>
    </tr>
    <tr>
      <th>3</th>
      <td>95014</td>
      <td>Technology</td>
      <td>154000</td>
      <td>Cupertino</td>
      <td>CA</td>
      <td>United States</td>
      <td>https://www.apple.com</td>
    </tr>
    <tr>
      <th>4</th>
      <td>60606-1596</td>
      <td>Industrials</td>
      <td>142000</td>
      <td>Chicago</td>
      <td>IL</td>
      <td>United States</td>
      <td>https://www.boeing.com</td>
    </tr>
  </tbody>
</table>
</div>

