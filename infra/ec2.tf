// Only used as a jump box for debugging

# resource "aws_instance" "jump_server" {
#   ami                    = "ami-052064a798f08f0d3" # Amazon Linux 2
#   instance_type          = "t2.micro"
#   subnet_id              = module.vpc.public_subnets[0]
#   key_name               = "cloud-computing-kp"
#   vpc_security_group_ids = [aws_security_group.jump_sg.id]

#   associate_public_ip_address = true

#   tags = {
#     Name = "jump-server"
#   }
# }
