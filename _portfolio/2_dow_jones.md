---
title: "Exploring Dow Jones"
excerpt: "Data mining, cleaning and creating SQLite DB with Python, visualization and interactive dashboard prepared with Power BI & Tableau <br/><img src='https://github.com/Kemalakin/kemalakin.github.io/blob/master/images/dow-jones/dj_pBI.gif?raw=true' width='300'>"
collection: portfolio
---

The *Dow Jones Industrial Average*, is a stock market index of 30 prominent companies listed on stock exchanges in the US. In this project, I obtain the various data of the companies in the index via web scraping (Pandas and Yahoo Finance), clean the data and create a database using Python. Finally, interactive dashboards for are created using Microsoft Power BI and Tableau.

A sample output is shown below.

<p align="center">
  <img src="https://github.com/Kemalakin/kemalakin.github.io/blob/master/images/dow-jones/dj_pBI.gif?raw=true" alt="Numbers" width="99%" height="540">
</p>

<!--
<video width="99%" height="540">
        <source src="/images/dow-jones/dj_pBI.mp4" type="video/mp4">
</video>
-->

<center><iframe src="https://public.tableau.com/views/MSFTStockPrices/MicrosoftStockPrices?:language=en-US&:display_count=n&:origin=viz_share_link&:showVizHome=no&:embed=true" width="99%" height="540" frameborder="0"></iframe></center>



</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[11]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">pd</span><span class="o">.</span><span class="n">read_sql</span><span class="p">(</span><span class="s2">&quot;Majors&quot;</span><span class="p">,</span><span class="n">engine</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[11]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>index</th>
      <th>zip</th>
      <th>sector</th>
      <th>fullTimeEmployees</th>
      <th>longBusinessSummary</th>
      <th>city</th>
      <th>phone</th>
      <th>state</th>
      <th>country</th>
      <th>companyOfficers</th>
      <th>...</th>
      <th>bid</th>
      <th>tradeable</th>
      <th>dividendYield</th>
      <th>bidSize</th>
      <th>dayHigh</th>
      <th>coinMarketCapLink</th>
      <th>regularMarketPrice</th>
      <th>logo_url</th>
      <th>fax</th>
      <th>address2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>None</td>
      <td>55144-1000</td>
      <td>Industrials</td>
      <td>95000</td>
      <td>3M Company operates as a diversified technolog...</td>
      <td>Saint Paul</td>
      <td>651 733 1110</td>
      <td>MN</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>139.73</td>
      <td>False</td>
      <td>0.0444</td>
      <td>900</td>
      <td>145.6900</td>
      <td>None</td>
      <td>141.3950</td>
      <td>https://logo.clearbit.com/3m.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>1</th>
      <td>None</td>
      <td>10285</td>
      <td>Financial Services</td>
      <td>64000</td>
      <td>American Express Company, together with its su...</td>
      <td>New York</td>
      <td>212 640 2000</td>
      <td>NY</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>152.01</td>
      <td>False</td>
      <td>0.0135</td>
      <td>800</td>
      <td>153.4300</td>
      <td>None</td>
      <td>151.7750</td>
      <td>https://logo.clearbit.com/americanexpress.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>2</th>
      <td>None</td>
      <td>91320-1799</td>
      <td>Healthcare</td>
      <td>24200</td>
      <td>Amgen Inc. discovers, develops, manufactures, ...</td>
      <td>Thousand Oaks</td>
      <td>805 447 1000</td>
      <td>CA</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>249.84</td>
      <td>False</td>
      <td>0.0312</td>
      <td>1400</td>
      <td>251.6900</td>
      <td>None</td>
      <td>249.8400</td>
      <td>https://logo.clearbit.com/amgen.com</td>
      <td>805 447 1010</td>
      <td>None</td>
    </tr>
    <tr>
      <th>3</th>
      <td>None</td>
      <td>95014</td>
      <td>Technology</td>
      <td>154000</td>
      <td>Apple Inc. designs, manufactures, and markets ...</td>
      <td>Cupertino</td>
      <td>408 996 1010</td>
      <td>CA</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>152.09</td>
      <td>False</td>
      <td>0.0060</td>
      <td>900</td>
      <td>153.0850</td>
      <td>None</td>
      <td>151.8700</td>
      <td>https://logo.clearbit.com/apple.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>4</th>
      <td>None</td>
      <td>60606-1596</td>
      <td>Industrials</td>
      <td>142000</td>
      <td>The Boeing Company, together with its subsidia...</td>
      <td>Chicago</td>
      <td>312 544 2000</td>
      <td>IL</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>156.62</td>
      <td>False</td>
      <td>NaN</td>
      <td>1100</td>
      <td>157.3700</td>
      <td>None</td>
      <td>156.1600</td>
      <td>https://logo.clearbit.com/boeing.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>5</th>
      <td>None</td>
      <td>60015</td>
      <td>Industrials</td>
      <td>107700</td>
      <td>Caterpillar Inc. manufactures and sells constr...</td>
      <td>Deerfield</td>
      <td>224-551-4000</td>
      <td>IL</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>182.32</td>
      <td>False</td>
      <td>0.0269</td>
      <td>900</td>
      <td>182.9250</td>
      <td>None</td>
      <td>182.0500</td>
      <td>https://logo.clearbit.com/caterpillar.com</td>
      <td>None</td>
      <td>Suite 100</td>
    </tr>
    <tr>
      <th>6</th>
      <td>None</td>
      <td>94583-2324</td>
      <td>Energy</td>
      <td>42595</td>
      <td>Chevron Corporation, through its subsidiaries,...</td>
      <td>San Ramon</td>
      <td>925 842 1000</td>
      <td>CA</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>149.14</td>
      <td>False</td>
      <td>0.0383</td>
      <td>1000</td>
      <td>150.6800</td>
      <td>None</td>
      <td>148.7100</td>
      <td>https://logo.clearbit.com/chevron.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>7</th>
      <td>None</td>
      <td>95134</td>
      <td>Technology</td>
      <td>79500</td>
      <td>Cisco Systems, Inc. designs, manufactures, and...</td>
      <td>San Jose</td>
      <td>408 526 4000</td>
      <td>CA</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>44.25</td>
      <td>False</td>
      <td>0.0342</td>
      <td>900</td>
      <td>44.5400</td>
      <td>None</td>
      <td>44.3550</td>
      <td>https://logo.clearbit.com/cisco.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>8</th>
      <td>None</td>
      <td>30313</td>
      <td>Consumer Defensive</td>
      <td>79000</td>
      <td>The Coca-Cola Company, a beverage company, man...</td>
      <td>Atlanta</td>
      <td>404 676 2121</td>
      <td>GA</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>63.51</td>
      <td>False</td>
      <td>0.0286</td>
      <td>800</td>
      <td>63.7200</td>
      <td>None</td>
      <td>63.7200</td>
      <td>https://logo.clearbit.com/coca-colacompany.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>9</th>
      <td>None</td>
      <td>91521</td>
      <td>Communication Services</td>
      <td>152000</td>
      <td>The Walt Disney Company, together with its sub...</td>
      <td>Burbank</td>
      <td>818 560 1000</td>
      <td>CA</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>101.31</td>
      <td>False</td>
      <td>NaN</td>
      <td>800</td>
      <td>102.3600</td>
      <td>None</td>
      <td>101.0500</td>
      <td>https://logo.clearbit.com/thewaltdisneycompany...</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>10</th>
      <td>None</td>
      <td>48674</td>
      <td>Basic Materials</td>
      <td>35700</td>
      <td>Dow Inc. provides various materials science so...</td>
      <td>Midland</td>
      <td>989 636 1000</td>
      <td>MI</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>50.97</td>
      <td>False</td>
      <td>0.0543</td>
      <td>1200</td>
      <td>51.3900</td>
      <td>None</td>
      <td>51.1000</td>
      <td>https://logo.clearbit.com/dow.com</td>
      <td>989 832 1456</td>
      <td>None</td>
    </tr>
    <tr>
      <th>11</th>
      <td>None</td>
      <td>10282</td>
      <td>Financial Services</td>
      <td>47000</td>
      <td>The Goldman Sachs Group, Inc., a financial ins...</td>
      <td>New York</td>
      <td>212-902-1000</td>
      <td>NY</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>322.15</td>
      <td>False</td>
      <td>0.0247</td>
      <td>1200</td>
      <td>324.0500</td>
      <td>None</td>
      <td>321.8050</td>
      <td>https://logo.clearbit.com/goldmansachs.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>12</th>
      <td>None</td>
      <td>30339</td>
      <td>Consumer Cyclical</td>
      <td>500000</td>
      <td>The Home Depot, Inc. operates as a home improv...</td>
      <td>Atlanta</td>
      <td>770 433 8211</td>
      <td>GA</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>297.99</td>
      <td>False</td>
      <td>0.0248</td>
      <td>1400</td>
      <td>300.4900</td>
      <td>None</td>
      <td>300.2000</td>
      <td>https://logo.clearbit.com/homedepot.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>13</th>
      <td>None</td>
      <td>28202</td>
      <td>Industrials</td>
      <td>99000</td>
      <td>Honeywell International Inc. operates as a div...</td>
      <td>Charlotte</td>
      <td>704 627 6200</td>
      <td>NC</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>181.42</td>
      <td>False</td>
      <td>0.0216</td>
      <td>1300</td>
      <td>183.5300</td>
      <td>None</td>
      <td>181.7000</td>
      <td>https://logo.clearbit.com/honeywell.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>14</th>
      <td>None</td>
      <td>10504</td>
      <td>Technology</td>
      <td>282100</td>
      <td>International Business Machines Corporation pr...</td>
      <td>Armonk</td>
      <td>914 499 1900</td>
      <td>NY</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>128.85</td>
      <td>False</td>
      <td>0.0515</td>
      <td>900</td>
      <td>129.3000</td>
      <td>None</td>
      <td>129.0550</td>
      <td>https://logo.clearbit.com/ibm.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>15</th>
      <td>None</td>
      <td>95054-1549</td>
      <td>Technology</td>
      <td>122900</td>
      <td>Intel Corporation engages in the design, manuf...</td>
      <td>Santa Clara</td>
      <td>408 765 8080</td>
      <td>CA</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>39.27</td>
      <td>False</td>
      <td>0.0373</td>
      <td>900</td>
      <td>39.5000</td>
      <td>None</td>
      <td>39.3400</td>
      <td>https://logo.clearbit.com/intel.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>16</th>
      <td>None</td>
      <td>08933</td>
      <td>Healthcare</td>
      <td>141700</td>
      <td>Johnson &amp; Johnson, together with its subsidiar...</td>
      <td>New Brunswick</td>
      <td>732 524 0400</td>
      <td>NJ</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>173.00</td>
      <td>False</td>
      <td>0.0263</td>
      <td>1000</td>
      <td>173.5846</td>
      <td>None</td>
      <td>173.5450</td>
      <td>https://logo.clearbit.com/jnj.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>17</th>
      <td>None</td>
      <td>10179</td>
      <td>Financial Services</td>
      <td>278494</td>
      <td>JPMorgan Chase &amp; Co. operates as a financial s...</td>
      <td>New York</td>
      <td>212 270 6000</td>
      <td>NY</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>114.70</td>
      <td>False</td>
      <td>0.0347</td>
      <td>800</td>
      <td>115.5800</td>
      <td>None</td>
      <td>114.6400</td>
      <td>https://logo.clearbit.com/jpmorganchase.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>18</th>
      <td>None</td>
      <td>60607</td>
      <td>Consumer Cyclical</td>
      <td>100000</td>
      <td>McDonald's Corporation operates and franchises...</td>
      <td>Chicago</td>
      <td>630 623 3000</td>
      <td>IL</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>254.28</td>
      <td>False</td>
      <td>0.0217</td>
      <td>800</td>
      <td>255.6000</td>
      <td>None</td>
      <td>254.7050</td>
      <td>https://logo.clearbit.com/corporate.mcdonalds.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>19</th>
      <td>None</td>
      <td>07033</td>
      <td>Healthcare</td>
      <td>67000</td>
      <td>Merck &amp; Co., Inc. operates as a healthcare com...</td>
      <td>Kenilworth</td>
      <td>908 740 4000</td>
      <td>NJ</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>90.70</td>
      <td>False</td>
      <td>0.0305</td>
      <td>800</td>
      <td>91.5750</td>
      <td>None</td>
      <td>90.9800</td>
      <td>https://logo.clearbit.com/merck.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>20</th>
      <td>None</td>
      <td>98052-6399</td>
      <td>Technology</td>
      <td>181000</td>
      <td>Microsoft Corporation develops, licenses, and ...</td>
      <td>Redmond</td>
      <td>425 882 8080</td>
      <td>WA</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>255.44</td>
      <td>False</td>
      <td>0.0096</td>
      <td>800</td>
      <td>259.8700</td>
      <td>None</td>
      <td>253.9100</td>
      <td>https://logo.clearbit.com/microsoft.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>21</th>
      <td>None</td>
      <td>97005-6453</td>
      <td>Consumer Cyclical</td>
      <td>79100</td>
      <td>NIKE, Inc., together with its subsidiaries, de...</td>
      <td>Beaverton</td>
      <td>503 671 6453</td>
      <td>OR</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>107.06</td>
      <td>False</td>
      <td>0.0112</td>
      <td>1200</td>
      <td>107.7104</td>
      <td>None</td>
      <td>107.1700</td>
      <td>https://logo.clearbit.com/investors.nike.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>22</th>
      <td>None</td>
      <td>45202</td>
      <td>Consumer Defensive</td>
      <td>101000</td>
      <td>The Procter &amp; Gamble Company provides branded ...</td>
      <td>Cincinnati</td>
      <td>513 983 1100</td>
      <td>OH</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>142.70</td>
      <td>False</td>
      <td>0.0254</td>
      <td>800</td>
      <td>143.7178</td>
      <td>None</td>
      <td>142.9000</td>
      <td>https://logo.clearbit.com/pginvestor.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>23</th>
      <td>None</td>
      <td>94105</td>
      <td>Technology</td>
      <td>77810</td>
      <td>Salesforce, Inc. provides customer relationshi...</td>
      <td>San Francisco</td>
      <td>415 901 7000</td>
      <td>CA</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>174.58</td>
      <td>False</td>
      <td>NaN</td>
      <td>800</td>
      <td>177.1300</td>
      <td>None</td>
      <td>173.1350</td>
      <td>https://logo.clearbit.com/salesforce.com</td>
      <td>415 901 7040</td>
      <td>3rd Floor 415 Mission Street</td>
    </tr>
    <tr>
      <th>24</th>
      <td>None</td>
      <td>10017</td>
      <td>Financial Services</td>
      <td>30184</td>
      <td>The Travelers Companies, Inc., through its sub...</td>
      <td>New York</td>
      <td>917 778 6000</td>
      <td>NY</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>160.16</td>
      <td>False</td>
      <td>0.0238</td>
      <td>1100</td>
      <td>160.9200</td>
      <td>None</td>
      <td>160.4600</td>
      <td>https://logo.clearbit.com/travelers.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>25</th>
      <td>None</td>
      <td>55343</td>
      <td>Healthcare</td>
      <td>350000</td>
      <td>UnitedHealth Group Incorporated operates as a ...</td>
      <td>Minnetonka</td>
      <td>952 936 1300</td>
      <td>MN</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>533.50</td>
      <td>False</td>
      <td>0.0125</td>
      <td>1200</td>
      <td>535.8900</td>
      <td>None</td>
      <td>535.8900</td>
      <td>https://logo.clearbit.com/unitedhealthgroup.com</td>
      <td>None</td>
      <td>9900 Bren Road East</td>
    </tr>
    <tr>
      <th>26</th>
      <td>None</td>
      <td>10036</td>
      <td>Communication Services</td>
      <td>119400</td>
      <td>Verizon Communications Inc., through its subsi...</td>
      <td>New York</td>
      <td>212 395 1000</td>
      <td>NY</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>44.72</td>
      <td>False</td>
      <td>0.0576</td>
      <td>1100</td>
      <td>44.8800</td>
      <td>None</td>
      <td>44.8500</td>
      <td>https://logo.clearbit.com/verizon.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>27</th>
      <td>None</td>
      <td>94128-8999</td>
      <td>Financial Services</td>
      <td>21500</td>
      <td>Visa Inc. operates as a payments technology co...</td>
      <td>San Francisco</td>
      <td>650 432 3200</td>
      <td>CA</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>213.62</td>
      <td>False</td>
      <td>0.0070</td>
      <td>800</td>
      <td>215.1500</td>
      <td>None</td>
      <td>212.9700</td>
      <td>https://logo.clearbit.com/usa.visa.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>28</th>
      <td>None</td>
      <td>60015</td>
      <td>Healthcare</td>
      <td>315000</td>
      <td>Walgreens Boots Alliance, Inc. operates as a p...</td>
      <td>Deerfield</td>
      <td>847 315 3700</td>
      <td>IL</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>38.85</td>
      <td>False</td>
      <td>0.0497</td>
      <td>1000</td>
      <td>39.0300</td>
      <td>None</td>
      <td>38.7950</td>
      <td>https://logo.clearbit.com/walgreensbootsallian...</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>29</th>
      <td>None</td>
      <td>72716</td>
      <td>Consumer Defensive</td>
      <td>2300000</td>
      <td>Walmart Inc. engages in the operation of retai...</td>
      <td>Bentonville</td>
      <td>479 273 4000</td>
      <td>AR</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>120.42</td>
      <td>False</td>
      <td>0.0170</td>
      <td>1800</td>
      <td>122.2590</td>
      <td>None</td>
      <td>120.5933</td>
      <td>https://logo.clearbit.com/stock.walmart.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>30</th>
      <td>None</td>
      <td>55144-1000</td>
      <td>Industrials</td>
      <td>95000</td>
      <td>3M Company operates as a diversified technolog...</td>
      <td>Saint Paul</td>
      <td>651 733 1110</td>
      <td>MN</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>149.97</td>
      <td>False</td>
      <td>0.0403</td>
      <td>800</td>
      <td>150.3500</td>
      <td>None</td>
      <td>150.3100</td>
      <td>https://logo.clearbit.com/3m.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>31</th>
      <td>None</td>
      <td>10285</td>
      <td>Financial Services</td>
      <td>64000</td>
      <td>American Express Company, together with its su...</td>
      <td>New York</td>
      <td>212 640 2000</td>
      <td>NY</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>164.02</td>
      <td>False</td>
      <td>0.0131</td>
      <td>1000</td>
      <td>164.2050</td>
      <td>None</td>
      <td>163.3700</td>
      <td>https://logo.clearbit.com/americanexpress.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>32</th>
      <td>None</td>
      <td>91320-1799</td>
      <td>Healthcare</td>
      <td>24200</td>
      <td>Amgen Inc. discovers, develops, manufactures, ...</td>
      <td>Thousand Oaks</td>
      <td>805 447 1000</td>
      <td>CA</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>248.95</td>
      <td>False</td>
      <td>0.0312</td>
      <td>900</td>
      <td>251.6100</td>
      <td>None</td>
      <td>249.9500</td>
      <td>https://logo.clearbit.com/amgen.com</td>
      <td>805 447 1010</td>
      <td>None</td>
    </tr>
    <tr>
      <th>33</th>
      <td>None</td>
      <td>95014</td>
      <td>Technology</td>
      <td>154000</td>
      <td>Apple Inc. designs, manufactures, and markets ...</td>
      <td>Cupertino</td>
      <td>408 996 1010</td>
      <td>CA</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>167.64</td>
      <td>False</td>
      <td>0.0056</td>
      <td>1200</td>
      <td>168.6500</td>
      <td>None</td>
      <td>167.3119</td>
      <td>https://logo.clearbit.com/apple.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>34</th>
      <td>None</td>
      <td>60606-1596</td>
      <td>Industrials</td>
      <td>142000</td>
      <td>The Boeing Company, together with its subsidia...</td>
      <td>Chicago</td>
      <td>312 544 2000</td>
      <td>IL</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>169.42</td>
      <td>False</td>
      <td>NaN</td>
      <td>1100</td>
      <td>169.7416</td>
      <td>None</td>
      <td>168.3243</td>
      <td>https://logo.clearbit.com/boeing.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>35</th>
      <td>None</td>
      <td>60015</td>
      <td>Industrials</td>
      <td>107700</td>
      <td>Caterpillar Inc. manufactures and sells constr...</td>
      <td>Deerfield</td>
      <td>224-551-4000</td>
      <td>IL</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>190.06</td>
      <td>False</td>
      <td>0.0259</td>
      <td>800</td>
      <td>190.7200</td>
      <td>None</td>
      <td>189.6050</td>
      <td>https://logo.clearbit.com/caterpillar.com</td>
      <td>None</td>
      <td>Suite 100</td>
    </tr>
    <tr>
      <th>36</th>
      <td>None</td>
      <td>94583-2324</td>
      <td>Energy</td>
      <td>42595</td>
      <td>Chevron Corporation, through its subsidiaries,...</td>
      <td>San Ramon</td>
      <td>925 842 1000</td>
      <td>CA</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>154.15</td>
      <td>False</td>
      <td>0.0365</td>
      <td>900</td>
      <td>156.6800</td>
      <td>None</td>
      <td>153.5900</td>
      <td>https://logo.clearbit.com/chevron.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>37</th>
      <td>None</td>
      <td>95134</td>
      <td>Technology</td>
      <td>79500</td>
      <td>Cisco Systems, Inc. designs, manufactures, and...</td>
      <td>San Jose</td>
      <td>408 526 4000</td>
      <td>CA</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>46.01</td>
      <td>False</td>
      <td>0.0338</td>
      <td>800</td>
      <td>46.0550</td>
      <td>None</td>
      <td>45.9200</td>
      <td>https://logo.clearbit.com/cisco.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>38</th>
      <td>None</td>
      <td>30313</td>
      <td>Consumer Defensive</td>
      <td>79000</td>
      <td>The Coca-Cola Company, a beverage company, man...</td>
      <td>Atlanta</td>
      <td>404 676 2121</td>
      <td>GA</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>63.37</td>
      <td>False</td>
      <td>0.0279</td>
      <td>800</td>
      <td>63.7900</td>
      <td>None</td>
      <td>63.4550</td>
      <td>https://logo.clearbit.com/coca-colacompany.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>39</th>
      <td>None</td>
      <td>91521</td>
      <td>Communication Services</td>
      <td>152000</td>
      <td>The Walt Disney Company, together with its sub...</td>
      <td>Burbank</td>
      <td>818 560 1000</td>
      <td>CA</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>110.63</td>
      <td>False</td>
      <td>NaN</td>
      <td>1300</td>
      <td>112.6400</td>
      <td>None</td>
      <td>110.4900</td>
      <td>https://logo.clearbit.com/thewaltdisneycompany...</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>40</th>
      <td>None</td>
      <td>48674</td>
      <td>Basic Materials</td>
      <td>35700</td>
      <td>Dow Inc. provides various materials science so...</td>
      <td>Midland</td>
      <td>989 636 1000</td>
      <td>MI</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>54.42</td>
      <td>False</td>
      <td>0.0531</td>
      <td>800</td>
      <td>54.5300</td>
      <td>None</td>
      <td>54.1856</td>
      <td>https://logo.clearbit.com/dow.com</td>
      <td>989 832 1456</td>
      <td>None</td>
    </tr>
    <tr>
      <th>41</th>
      <td>None</td>
      <td>10282</td>
      <td>Financial Services</td>
      <td>47000</td>
      <td>The Goldman Sachs Group, Inc., a financial ins...</td>
      <td>New York</td>
      <td>212-902-1000</td>
      <td>NY</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>348.53</td>
      <td>False</td>
      <td>0.0238</td>
      <td>900</td>
      <td>349.7000</td>
      <td>None</td>
      <td>347.7500</td>
      <td>https://logo.clearbit.com/goldmansachs.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>42</th>
      <td>None</td>
      <td>30339</td>
      <td>Consumer Cyclical</td>
      <td>500000</td>
      <td>The Home Depot, Inc. operates as a home improv...</td>
      <td>Atlanta</td>
      <td>770 433 8211</td>
      <td>GA</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>311.75</td>
      <td>False</td>
      <td>0.0244</td>
      <td>1000</td>
      <td>312.9800</td>
      <td>None</td>
      <td>310.9300</td>
      <td>https://logo.clearbit.com/homedepot.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>43</th>
      <td>None</td>
      <td>28202</td>
      <td>Industrials</td>
      <td>99000</td>
      <td>Honeywell International Inc. operates as a div...</td>
      <td>Charlotte</td>
      <td>704 627 6200</td>
      <td>NC</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>198.03</td>
      <td>False</td>
      <td>0.0204</td>
      <td>1300</td>
      <td>198.3000</td>
      <td>None</td>
      <td>197.9300</td>
      <td>https://logo.clearbit.com/honeywell.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>44</th>
      <td>None</td>
      <td>10504</td>
      <td>Technology</td>
      <td>282100</td>
      <td>International Business Machines Corporation pr...</td>
      <td>Armonk</td>
      <td>914 499 1900</td>
      <td>NY</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>131.63</td>
      <td>False</td>
      <td>0.0510</td>
      <td>800</td>
      <td>131.7800</td>
      <td>None</td>
      <td>131.5900</td>
      <td>https://logo.clearbit.com/ibm.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>45</th>
      <td>None</td>
      <td>95054-1549</td>
      <td>Technology</td>
      <td>121100</td>
      <td>Intel Corporation engages in the design, manuf...</td>
      <td>Santa Clara</td>
      <td>408 765 8080</td>
      <td>CA</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>34.80</td>
      <td>False</td>
      <td>0.0413</td>
      <td>1800</td>
      <td>35.1450</td>
      <td>None</td>
      <td>34.7399</td>
      <td>https://logo.clearbit.com/intel.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>46</th>
      <td>None</td>
      <td>08933</td>
      <td>Healthcare</td>
      <td>141700</td>
      <td>Johnson &amp; Johnson, together with its subsidiar...</td>
      <td>New Brunswick</td>
      <td>732 524 0400</td>
      <td>NJ</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>170.63</td>
      <td>False</td>
      <td>0.0266</td>
      <td>1100</td>
      <td>171.2400</td>
      <td>None</td>
      <td>170.8300</td>
      <td>https://logo.clearbit.com/jnj.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>47</th>
      <td>None</td>
      <td>10179</td>
      <td>Financial Services</td>
      <td>278494</td>
      <td>JPMorgan Chase &amp; Co. operates as a financial s...</td>
      <td>New York</td>
      <td>212 270 6000</td>
      <td>NY</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>119.09</td>
      <td>False</td>
      <td>0.0347</td>
      <td>900</td>
      <td>119.3600</td>
      <td>None</td>
      <td>118.3700</td>
      <td>https://logo.clearbit.com/jpmorganchase.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>48</th>
      <td>None</td>
      <td>60607</td>
      <td>Consumer Cyclical</td>
      <td>100000</td>
      <td>McDonald's Corporation operates and franchises...</td>
      <td>Chicago</td>
      <td>630 623 3000</td>
      <td>IL</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>262.51</td>
      <td>False</td>
      <td>0.0212</td>
      <td>1100</td>
      <td>263.6800</td>
      <td>None</td>
      <td>262.3650</td>
      <td>https://logo.clearbit.com/corporate.mcdonalds.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>49</th>
      <td>None</td>
      <td>07033</td>
      <td>Healthcare</td>
      <td>67000</td>
      <td>Merck &amp; Co., Inc. operates as a healthcare com...</td>
      <td>Kenilworth</td>
      <td>908 740 4000</td>
      <td>NJ</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>89.73</td>
      <td>False</td>
      <td>0.0308</td>
      <td>1800</td>
      <td>89.9800</td>
      <td>None</td>
      <td>89.8000</td>
      <td>https://logo.clearbit.com/merck.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>50</th>
      <td>None</td>
      <td>98052-6399</td>
      <td>Technology</td>
      <td>221000</td>
      <td>Microsoft Corporation develops, licenses, and ...</td>
      <td>Redmond</td>
      <td>425 882 8080</td>
      <td>WA</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>287.85</td>
      <td>False</td>
      <td>0.0088</td>
      <td>3100</td>
      <td>289.2399</td>
      <td>None</td>
      <td>287.7000</td>
      <td>https://logo.clearbit.com/microsoft.com</td>
      <td>425 706 7329</td>
      <td>None</td>
    </tr>
    <tr>
      <th>51</th>
      <td>None</td>
      <td>97005-6453</td>
      <td>Consumer Cyclical</td>
      <td>79100</td>
      <td>NIKE, Inc., together with its subsidiaries, de...</td>
      <td>Beaverton</td>
      <td>503 671 6453</td>
      <td>OR</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>113.01</td>
      <td>False</td>
      <td>0.0111</td>
      <td>800</td>
      <td>113.4300</td>
      <td>None</td>
      <td>112.5500</td>
      <td>https://logo.clearbit.com/investors.nike.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>52</th>
      <td>None</td>
      <td>45202</td>
      <td>Consumer Defensive</td>
      <td>106000</td>
      <td>The Procter &amp; Gamble Company provides branded ...</td>
      <td>Cincinnati</td>
      <td>513 983 1100</td>
      <td>OH</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>146.23</td>
      <td>False</td>
      <td>0.0252</td>
      <td>900</td>
      <td>146.5000</td>
      <td>None</td>
      <td>146.0500</td>
      <td>https://logo.clearbit.com/pginvestor.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>53</th>
      <td>None</td>
      <td>94105</td>
      <td>Technology</td>
      <td>77810</td>
      <td>Salesforce, Inc. provides customer relationshi...</td>
      <td>San Francisco</td>
      <td>415 901 7000</td>
      <td>CA</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>187.87</td>
      <td>False</td>
      <td>NaN</td>
      <td>800</td>
      <td>189.5300</td>
      <td>None</td>
      <td>187.2300</td>
      <td>https://logo.clearbit.com/salesforce.com</td>
      <td>415 901 7040</td>
      <td>3rd Floor 415 Mission Street</td>
    </tr>
    <tr>
      <th>54</th>
      <td>None</td>
      <td>10017</td>
      <td>Financial Services</td>
      <td>30184</td>
      <td>The Travelers Companies, Inc., through its sub...</td>
      <td>New York</td>
      <td>917 778 6000</td>
      <td>NY</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>164.83</td>
      <td>False</td>
      <td>0.0234</td>
      <td>1300</td>
      <td>165.0500</td>
      <td>None</td>
      <td>164.7900</td>
      <td>https://logo.clearbit.com/travelers.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>55</th>
      <td>None</td>
      <td>55343</td>
      <td>Healthcare</td>
      <td>350000</td>
      <td>UnitedHealth Group Incorporated operates as a ...</td>
      <td>Minnetonka</td>
      <td>952 936 1300</td>
      <td>MN</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>539.16</td>
      <td>False</td>
      <td>0.0123</td>
      <td>1100</td>
      <td>541.9800</td>
      <td>None</td>
      <td>538.8200</td>
      <td>https://logo.clearbit.com/unitedhealthgroup.com</td>
      <td>None</td>
      <td>9900 Bren Road East</td>
    </tr>
    <tr>
      <th>56</th>
      <td>None</td>
      <td>10036</td>
      <td>Communication Services</td>
      <td>119400</td>
      <td>Verizon Communications Inc., through its subsi...</td>
      <td>New York</td>
      <td>212 395 1000</td>
      <td>NY</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>44.98</td>
      <td>False</td>
      <td>0.0575</td>
      <td>1200</td>
      <td>45.0600</td>
      <td>None</td>
      <td>44.9500</td>
      <td>https://logo.clearbit.com/verizon.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>57</th>
      <td>None</td>
      <td>94128-8999</td>
      <td>Financial Services</td>
      <td>21500</td>
      <td>Visa Inc. operates as a payments technology co...</td>
      <td>San Francisco</td>
      <td>650 432 3200</td>
      <td>CA</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>214.14</td>
      <td>False</td>
      <td>0.0071</td>
      <td>900</td>
      <td>214.7800</td>
      <td>None</td>
      <td>214.1195</td>
      <td>https://logo.clearbit.com/usa.visa.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>58</th>
      <td>None</td>
      <td>60015</td>
      <td>Healthcare</td>
      <td>315000</td>
      <td>Walgreens Boots Alliance, Inc. operates as a p...</td>
      <td>Deerfield</td>
      <td>847 315 3700</td>
      <td>IL</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>39.94</td>
      <td>False</td>
      <td>0.0492</td>
      <td>900</td>
      <td>40.1150</td>
      <td>None</td>
      <td>39.8250</td>
      <td>https://logo.clearbit.com/walgreensbootsallian...</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>59</th>
      <td>None</td>
      <td>72716</td>
      <td>Consumer Defensive</td>
      <td>2300000</td>
      <td>Walmart Inc. engages in the operation of retai...</td>
      <td>Bentonville</td>
      <td>479 273 4000</td>
      <td>AR</td>
      <td>United States</td>
      <td>None</td>
      <td>...</td>
      <td>129.29</td>
      <td>False</td>
      <td>0.0174</td>
      <td>1200</td>
      <td>130.1300</td>
      <td>None</td>
      <td>128.9700</td>
      <td>https://logo.clearbit.com/stock.walmart.com</td>
      <td>None</td>
      <td>None</td>
    </tr>
  </tbody>
</table>
<p>60 rows × 155 columns</p>
</div>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[&nbsp;]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span> 
</pre></div>

    </div>
</div>
</div>

</div>
 

