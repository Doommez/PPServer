-- CreateTable
CREATE TABLE "public"."Post" (
    "id_post" SERIAL NOT NULL,
    "title" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "autchor" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id_post")
);
