import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_dTPw1sQVUm8e@ep-square-meadow-a45w5vlv-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require'
});

export async function POST(request: Request) {
  try {
    const { playerName, score } = await request.json();
    
    const query = 'INSERT INTO public.player_score (player_name, score) VALUES ($1, $2)';
    await pool.query(query, [playerName, score]);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving score:', error);
    return NextResponse.json({ error: 'Failed to save score' }, { status: 500 });
  }
}