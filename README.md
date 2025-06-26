Indonesia Employment Dashboard 2024
This project presents an interactive data visualization dashboard that analyzes job seekers, job vacancies, and employment placement in Indonesia in 2024. The dashboard was created using Tableau and embedded in a personal portfolio website.

Project Overview
This dashboard visualizes:

Number of registered job seekers (by gender and province)

Number of job vacancies (by gender and province)

Number of employment placements (by gender and province)

Ratio of placements to job seekers

Cleaned and summarized data sources

You can interact with the dashboard through filters and visual elements.

View the dashboard online:
https://abdulpaintar.vercel.app/ (replace with your actual portfolio link)

Data Sources
The data was obtained from the Ministry of Manpower or BPS (Indonesia’s official statistics portal), and includes the following sheets:

pencari_kerja (raw data of job seekers)

kerja_bersih (cleaned version)

kerja_ringkas (summarized by province and gender)

rasio_penempatan (placement ratio analysis)

final_data_kerja (final compiled dataset)

File format: .csv
Total Provinces Covered: 34

Tools Used
RStudio – for cleaning and summarizing data using tidyverse

Tableau Public – for dashboard visualization

Vercel – for web deployment

HTML & Tableau Embedding API – to embed dashboards in the site

Folder Structure
GENZ/
├── pencari_kerja.csv
├── kerja_bersih.csv
├── kerja_ringkas.csv
├── final_data_kerja.csv
├── rasio_penempatan.csv

public/
├── index.html (embedded Tableau dashboard)

How to Use
Clone the repository

Open index.html in a browser or deploy to a static host like Vercel or Netlify

Make sure your Tableau dashboard is publicly accessible

Embed Snippet Used
html
Copy
Edit
<script type="module" src="https://prod-apsoutheast-c.online.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js"></script>
<tableau-viz 
  id="tableau-viz" 
  src="https://prod-apsoutheast-c.online.tableau.com/t/abdulpaintar-ccfe854ed6/views/Book1/Dashboard1"
  width="100%" 
  height="800" 
  hide-tabs 
  toolbar="bottom">
</tableau-viz>
Contact
Abdul Ghofur
abdulpaintar@gmail.com
085845134291
Instagram: @go_fury_

—
