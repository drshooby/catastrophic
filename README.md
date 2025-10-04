# catastrophic
A demo application to showcase secure, highly-available EC2 deployments on AWS  
> This project was created as part of my Cloud Computing midterm  

## Architecture Diagram
<img width="1249" height="614" alt="SCR-20251003-rtxk" src="https://github.com/user-attachments/assets/32986f15-d900-4338-a457-5bb2695b6f8a" />

## App
<img width="668" height="311" alt="image" src="https://github.com/user-attachments/assets/5be8d939-cd7f-4af7-a721-c706881fbf8d" />

## Features
- **Talk to Cat:** Returns "meow"  
- **Get Cat:** Fetches a random cat picture from [CATAAS](https://cataas.com/)

## Stack  
- **Client:** Next/React  
- **Server:** Rust (actix-web)  
- **Cloud Platform:** AWS  
- **Infrastructure as Code:** Terraform  

## Setup  
1. Install [Terraform](https://developer.hashicorp.com/terraform/install) and [AWS CLI](https://aws.amazon.com/cli/)  
2. Configure your AWS credentials (`aws configure`)  
3. Set up a Route 53 hosted zone and update your DNS registrar with the provided nameservers  
4. Run the GitHub Actions workflow to build and push the code to ECR (ensure your repository is configured to allow OIDC access to AWS)  
5. Run `terraform init && terraform apply` in the `/infra` directory
