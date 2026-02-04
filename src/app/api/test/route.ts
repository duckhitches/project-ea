/**
 * Copyright (c) 2025 Eshan Vijay Shettennavar
 * 
 * This file is licensed under the Business Source License 1.1.
 * See LICENSE-BUSL-1.1.txt in the root directory for details.
 * 
 * Use of this software is governed by the Business Source License.
 * Change Date: February 4, 2029
 * Change License: Apache License 2.0
 */

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'API is working' })
} 