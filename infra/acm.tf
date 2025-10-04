resource "aws_acm_certificate" "cert" {
  domain_name       = "cat.ettukube.com"
  validation_method = "DNS"
}

resource "aws_acm_certificate_validation" "validation" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}
