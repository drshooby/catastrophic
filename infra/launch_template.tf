resource "aws_launch_template" "ec2_lt" {
  name_prefix = "catastrophic-web-server-lt-"

  iam_instance_profile {
    name = aws_iam_instance_profile.ec2_ecr_profile.name
  }

  key_name = "cloud-computing-kp"

  image_id                             = "ami-052064a798f08f0d3" # Amazon Linux 2
  instance_type                        = "t3.micro"
  instance_initiated_shutdown_behavior = "terminate"

  metadata_options {
    http_endpoint               = "enabled"
    http_tokens                 = "required"
    http_put_response_hop_limit = 1
    instance_metadata_tags      = "enabled"
  }

  vpc_security_group_ids = [aws_security_group.web_servers_sg.id]

  tag_specifications {
    resource_type = "instance"

    tags = {
      Name = "machine"
    }
  }

  user_data = base64encode(
    templatefile("${path.module}/scripts/user_data", local.script_vars)
  )
}

locals {
  script_vars = {
    aws_account_id = var.aws_account_id
    aws_region     = var.aws_region
  }
}
