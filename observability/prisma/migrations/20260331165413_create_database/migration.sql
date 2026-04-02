-- CreateTable
CREATE TABLE "urls" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3),
    "click_count" BIGINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clicks" (
    "id" BIGSERIAL NOT NULL,
    "url_id" TEXT NOT NULL,
    "clicked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clicks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_code_key" ON "urls"("code");

-- CreateIndex
CREATE UNIQUE INDEX "urls_url_key" ON "urls"("url");

-- CreateIndex
CREATE INDEX "clicks_url_id_idx" ON "clicks"("url_id");

-- CreateIndex
CREATE INDEX "clicks_clicked_at_idx" ON "clicks"("clicked_at");

-- AddForeignKey
ALTER TABLE "clicks" ADD CONSTRAINT "clicks_url_id_fkey" FOREIGN KEY ("url_id") REFERENCES "urls"("id") ON DELETE CASCADE ON UPDATE CASCADE;
