resource "aws_route53_record" "app_dns" {
  zone_id = var.hosted_zone_id
  name    = "cat.ettukube.com"
  type    = "A"

  alias {
    name                   = aws_lb.app_load_balancer.dns_name
    zone_id                = aws_lb.app_load_balancer.zone_id
    evaluate_target_health = true
  }
}
