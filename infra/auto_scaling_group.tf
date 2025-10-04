resource "aws_autoscaling_group" "web_asg" {
  name                = "catastrophic-web-asg"
  desired_capacity    = 1
  min_size            = 1
  max_size            = 1
  vpc_zone_identifier = module.vpc.private_subnets
  health_check_type   = "EC2"
  force_delete        = true

  launch_template {
    id      = aws_launch_template.ec2_lt.id
    version = "$Latest"
  }

  tag {
    key                 = "Name"
    value               = "web-asg-instance"
    propagate_at_launch = true
  }
}
