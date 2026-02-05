import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Пример: создать пользователей
  const hashedPassword = await bcrypt.hash('123452', 10)
  await prisma.user.createMany({
    data: [{ username: 'jenya2', hash: hashedPassword }],
    skipDuplicates: true, // чтобы не ломалось при повторном запуске
  })

  // Пример: создать роли
  await prisma.role.createMany({
    data: [{ name: 'admin' }, { name: 'user' }],
    skipDuplicates: true,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .then(() => {
    console.log('все окич братишка, накинули мусора')
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
