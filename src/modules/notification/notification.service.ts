import { Injectable } from '@nestjs/common'
import { PrismaService } from 'modules/prisma'
import { NotificationInterface } from './interfaces'

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async getNotifications(userId: string): Promise<NotificationInterface[]> {
    const notifications = await this.prisma.notification.findMany({
      take: 10,
      where: { adminId: userId, read: false },
      orderBy: { read: 'asc', createdAt: 'desc' },
    })

    return notifications
  }

  async markAsRead(notificationId: string): Promise<void> {
    await this.prisma.notification.update({
      where: { id: notificationId },
      data: { read: true },
    })
  }
}
